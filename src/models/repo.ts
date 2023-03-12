import { Schema, model } from "mongoose";

export interface IRepository {
  id: number;
  name: string;
  githubUrl: string;
  siteUrl?: string;
  description: string;
  language?: string;
}

const Repository = new Schema<IRepository>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  githubUrl: { type: String, required: true },
  siteUrl: { type: String, required: false },
  description: { type: String, required: true },
  language: { type: String, required: false },
});

export default model<IRepository>("Repository", Repository);
