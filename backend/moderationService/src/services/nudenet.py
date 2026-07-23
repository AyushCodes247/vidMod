import time

from nudenet import NudeDetector

from configs.dotenv import Env

detector = NudeDetector()


# ----------------------------------
# Explicit NSFW Labels.
# ----------------------------------

EXPLICIT_LABELS = {
    "FEMALE_BREAST_EXPOSED",
    "FEMALE_GENITALIA_EXPOSED",
    "MALE_GENITALIA_EXPOSED",
    "ANUS_EXPOSED",
    "BUTTOCKS_EXPOSED",
}


# ----------------------------------
# Sensitive NSFW Labels.
# ----------------------------------

SENSITIVE_LABELS = {
    "FEMALE_BREAST_COVERED",
    "FEMALE_GENITALIA_COVERED",
    "MALE_GENITALIA_COVERED",
    "BUTTOCKS_COVERED",
    "BELLY_EXPOSED",
}


# ----------------------------------
# Explicit Severity Weights.
# ----------------------------------

EXPLICIT_WEIGHTS = {

    # Highest severity.
    "FEMALE_GENITALIA_EXPOSED": 4.0,
    "MALE_GENITALIA_EXPOSED": 4.0,
    "ANUS_EXPOSED": 4.0,

    # Medium severity.
    "FEMALE_BREAST_EXPOSED": 2.5,

    # Lower severity.
    "BUTTOCKS_EXPOSED": 1.5,
}


# ----------------------------------
# Sensitive Severity Weights.
# ----------------------------------

SENSITIVE_WEIGHTS = {

    # High sensitive content.
    "FEMALE_GENITALIA_COVERED": 3.0,
    "MALE_GENITALIA_COVERED": 3.0,

    # Medium.
    "FEMALE_BREAST_COVERED": 2.0,

    # Lower.
    "BUTTOCKS_COVERED": 1.5,

    # Very low severity.
    "BELLY_EXPOSED": 0.5,
}


# ----------------------------------
# Percentage Thresholds.
# ----------------------------------

SENSITIVE_EXPLICIT_THRESHOLD = 1.0
SENSITIVE_CONTENT_THRESHOLD = 15.0

UNSAFE_EXPLICIT_THRESHOLD = 10.0
BLOCKED_EXPLICIT_THRESHOLD = 25.0


# ----------------------------------
# Score Thresholds.
# ----------------------------------

UNSAFE_SCORE_THRESHOLD = 5.0
BLOCKED_SCORE_THRESHOLD = 15.0

OVERALL_SENSITIVE_THRESHOLD = 25.0
OVERALL_UNSAFE_THRESHOLD = 75.0
OVERALL_BLOCKED_THRESHOLD = 200.0


async def moderate_frames(
    frame_paths: list[str],
) -> dict[str, object]:
    """
    Production ready NudeNet based
    moderation engine.
    """

    start_time = time.perf_counter()

    safe_frames = 0
    sensitive_frames = 0
    explicit_frames = 0
    processed_frames = 0

    explicit_score = 0.0
    sensitive_score = 0.0

    highest_confidence = 0.0
    highest_prediction = None

    highest_explicit_confidence = 0.0
    highest_explicit_prediction = None

    highest_sensitive_confidence = 0.0
    highest_sensitive_prediction = None

    for frame_path in frame_paths:

        processed_frames += 1

        predictions = detector.detect(
            frame_path
        )

        if not predictions:

            safe_frames += 1
            continue

        frame_is_sensitive = False
        frame_is_explicit = False

        frame_explicit_score = 0.0
        frame_sensitive_score = 0.0

        for prediction in predictions:

            confidence = prediction["score"]
            label = prediction["class"]

            # Highest confidence prediction.
            if confidence > highest_confidence:

                highest_confidence = confidence

                highest_prediction = {
                    "label": label,
                    "confidence": confidence,
                }

            # Ignore low confidence detections.
            if (
                confidence
                < Env.NUDENET_THRESHOLD
            ):
                continue

            # ----------------------------------
            # Explicit Content.
            # ----------------------------------

            if label in EXPLICIT_LABELS:

                frame_is_explicit = True

                weighted_score = (
                    confidence *
                    EXPLICIT_WEIGHTS[label]
                )

                if (
                    weighted_score
                    > frame_explicit_score
                ):
                    frame_explicit_score = (
                        weighted_score
                    )

                if (
                    confidence
                    > highest_explicit_confidence
                ):

                    highest_explicit_confidence = (
                        confidence
                    )

                    highest_explicit_prediction = {
                        "label": label,
                        "confidence": confidence,
                    }

            # ----------------------------------
            # Sensitive Content.
            # ----------------------------------

            elif label in SENSITIVE_LABELS:

                frame_is_sensitive = True

                weighted_score = (
                    confidence *
                    SENSITIVE_WEIGHTS[label]
                )

                if (
                    weighted_score
                    > frame_sensitive_score
                ):
                    frame_sensitive_score = (
                        weighted_score
                    )

                if (
                    confidence
                    > highest_sensitive_confidence
                ):

                    highest_sensitive_confidence = (
                        confidence
                    )

                    highest_sensitive_prediction = {
                        "label": label,
                        "confidence": confidence,
                    }

        # ----------------------------------
        # Explicit content takes priority.
        # ----------------------------------

        if frame_is_explicit:

            explicit_frames += 1

            explicit_score += (
                frame_explicit_score
            )

        elif frame_is_sensitive:

            sensitive_frames += 1

            sensitive_score += (
                frame_sensitive_score
            )

        else:

            safe_frames += 1

    # ----------------------------------
    # Percentages.
    # ----------------------------------

    safe_percentage = round(
        (
            safe_frames
            / processed_frames
        ) * 100,
        2,
    ) if processed_frames else 0.0

    sensitive_percentage = round(
        (
            sensitive_frames
            / processed_frames
        ) * 100,
        2,
    ) if processed_frames else 0.0

    explicit_percentage = round(
        (
            explicit_frames
            / processed_frames
        ) * 100,
        2,
    ) if processed_frames else 0.0

    # ----------------------------------
    # Confidence weighted percentages.
    # ----------------------------------

    explicit_score_percentage = round(
        (
            explicit_score
            / processed_frames
        ) * 100,
        2,
    ) if processed_frames else 0.0

    sensitive_score_percentage = round(
        (
            sensitive_score
            / processed_frames
        ) * 100,
        2,
    ) if processed_frames else 0.0

    # ----------------------------------
    # Average confidences.
    # ----------------------------------

    average_explicit_confidence = round(
        (
            explicit_score
            / explicit_frames
        ),
        4,
    ) if explicit_frames else 0.0

    average_sensitive_confidence = round(
        (
            sensitive_score
            / sensitive_frames
        ),
        4,
    ) if sensitive_frames else 0.0

    # ----------------------------------
    # Overall Risk Score.
    # ----------------------------------

    overall_risk_score = round(
        (
            explicit_score * 3
        ) + (
            sensitive_score * 1.5
        ),
        4,
    )

    # ----------------------------------
    # Final decision.
    # ----------------------------------

    decision = determine_decision(

        explicit_percentage=
        explicit_percentage,

        sensitive_percentage=
        sensitive_percentage,

        explicit_score_percentage=
        explicit_score_percentage,

        overall_risk_score=
        overall_risk_score,
    )

    processing_time_ms = int(
        (
            time.perf_counter()
            - start_time
        ) * 1000
    )

    return {

        # Decision.
        "decision":
        decision,

        # Frames.
        "framesProcessed":
        processed_frames,

        "safeFrames":
        safe_frames,

        "sensitiveFrames":
        sensitive_frames,

        "explicitFrames":
        explicit_frames,

        # Percentages.
        "safePercentage":
        safe_percentage,

        "sensitivePercentage":
        sensitive_percentage,

        "explicitPercentage":
        explicit_percentage,

        # Scores.
        "explicitScore":
        round(explicit_score, 4),

        "sensitiveScore":
        round(sensitive_score, 4),

        "overallRiskScore":
        overall_risk_score,

        "explicitScorePercentage":
        explicit_score_percentage,

        "sensitiveScorePercentage":
        sensitive_score_percentage,

        # Averages.
        "averageExplicitConfidence":
        average_explicit_confidence,

        "averageSensitiveConfidence":
        average_sensitive_confidence,

        # Predictions.
        "highestConfidence":
        round(
            highest_confidence,
            4,
        ),

        "highestPrediction":
        highest_prediction,

        "highestExplicitPrediction":
        highest_explicit_prediction,

        "highestSensitivePrediction":
        highest_sensitive_prediction,

        # Metadata.
        "processingTimeMs":
        processing_time_ms,

        "modelVersion":
        "nudenet-onnx-v2",
    }


def determine_decision(
    explicit_percentage: float,
    sensitive_percentage: float,
    explicit_score_percentage: float,
    overall_risk_score: float,
) -> str:
    """
    Production ready moderation
    decision engine.
    """

    # ----------------------------------
    # Pornographic content.
    # ----------------------------------

    if (

        explicit_percentage
        >= BLOCKED_EXPLICIT_THRESHOLD

        or

        explicit_score_percentage
        >= BLOCKED_SCORE_THRESHOLD

        or

        overall_risk_score
        >= OVERALL_BLOCKED_THRESHOLD

    ):
        return "BLOCKED"

    # ----------------------------------
    # Explicit NSFW.
    # ----------------------------------

    if (

        explicit_percentage
        >= UNSAFE_EXPLICIT_THRESHOLD

        or

        explicit_score_percentage
        >= UNSAFE_SCORE_THRESHOLD

        or

        overall_risk_score
        >= OVERALL_UNSAFE_THRESHOLD

    ):
        return "UNSAFE"

    # ----------------------------------
    # Semi NSFW.
    # ----------------------------------

    if (

        explicit_percentage
        >= SENSITIVE_EXPLICIT_THRESHOLD

        or

        sensitive_percentage
        >= SENSITIVE_CONTENT_THRESHOLD

        or

        overall_risk_score
        >= OVERALL_SENSITIVE_THRESHOLD

    ):
        return "SENSITIVE"

    # ----------------------------------
    # Safe.
    # ----------------------------------

    return "SAFE"