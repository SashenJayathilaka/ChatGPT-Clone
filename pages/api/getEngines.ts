import { NextApiRequest, NextApiResponse } from "next";
import openai from "@/utils/chatgpt";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOption: Option[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const models = await openai.listModels().then((res) => res.data.data);

  const modelOption = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  res.status(200).json({
    modelOption,
  });
}
