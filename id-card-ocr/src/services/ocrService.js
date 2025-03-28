import { TextractClient, DetectDocumentTextCommand } from "@aws-sdk/client-textract";

const client = new TextractClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET
  }
});

export const extractIDInfo = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const params = { Document: { Bytes: buffer } };
  const command = new DetectDocumentTextCommand(params);
  const data = await client.send(command);

  return parseTextractData(data);
};

const parseTextractData = (data) => {
  const lines = data.Blocks.filter(b => b.BlockType === "LINE").map(l => l.Text);
  return {
    firstName: lines[0] || "",
    lastName: lines[1] || "",
    dob: lines.find(l => /\d{2}\/\d{2}\/\d{4}/.test(l)) || ""
  };
};
