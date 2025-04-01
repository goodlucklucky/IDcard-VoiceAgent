import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
  region: 'us-east-1'
});

const textract = new AWS.Textract();

export const extractText = async (file) => {
  const params = {
    Document: {
      Bytes: await file.arrayBuffer()
    }
  };

  try {
    const data = await textract.detectDocumentText(params).promise();
    return parseText(data.Blocks);
  } catch (err) {
    console.error("OCR Error:", err);
    throw new Error("Failed to process ID");
  }
};

const parseText = (blocks) => {
  const lines = blocks
    .filter(b => b.BlockType === "LINE")
    .map(b => b.Text);

  return {
    firstName: lines[0] || "",
    lastName: lines[1] || "",
    dob: lines.find(l => /\d{2}\/\d{2}\/\d{4}/.test(l)) || ""
  };
};
