import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

import type { GetObjectCommandOutput } from "@aws-sdk/client-s3";

import env from "@/configs/dotenv.config.js";

import { createReadStream } from "fs";

export const s3Client = new S3Client({
  region: env.S3_REGION,

  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },
});

type UploadData = {
  key: string;
  filePath: string;
  fileType: string;
};

export async function uploadS3({
  key,
  filePath,
  fileType,
}: UploadData): Promise<string> {
  try {
    const fileStream = createReadStream(filePath);

    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: key,
      Body: fileStream,
      ContentType: fileType,
    });

    const response = await s3Client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error("Failed to upload object.");
    }

    return key;
  } catch (error) {
    console.error("S3 Upload Error :", error);

    throw error;
  }
}

export async function getObject(key: string): Promise<GetObjectCommandOutput> {
  try {
    return await s3Client.send(
      new GetObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
      }),
    );
  } catch (error) {
    console.error("S3 Get Object Error :", error);

    throw error;
  }
}

export async function getObjectAsString(key: string): Promise<string> {
  try {
    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
      }),
    );

    if (!response.Body) {
      throw new Error("Object body is empty.");
    }

    return await response.Body.transformToString();
  } catch (error) {
    console.error("S3 Get Object As String Error :", error);

    throw error;
  }
}

export async function objectExists(key: string): Promise<boolean> {
  try {
    await s3Client.send(
      new HeadObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
      }),
    );

    return true;
  } catch {
    return false;
  }
}

export async function deleteObject(key: string): Promise<boolean> {
  try {
    const response = await s3Client.send(
      new DeleteObjectCommand({
        Bucket: env.S3_BUCKET_NAME,
        Key: key,
      }),
    );

    return response.$metadata.httpStatusCode === 204;
  } catch (error) {
    console.error("S3 Delete Object Error :", error);

    throw error;
  }
}

export async function deleteDirectory(prefix: string): Promise<void> {
  try {
    const objects = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: env.S3_BUCKET_NAME,
        Prefix: prefix,
      }),
    );

    if (!objects.Contents?.length) {
      return;
    }

    await s3Client.send(
      new DeleteObjectsCommand({
        Bucket: env.S3_BUCKET_NAME,

        Delete: {
          Objects: objects.Contents.map((object) => ({
            Key: object.Key!,
          })),
        },
      }),
    );
  } catch (error) {
    console.error("S3 Directory Delete Error :", error);

    throw error;
  }
}
