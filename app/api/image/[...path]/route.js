export const runtime = "edge";

export default async function handler(req, res) {
  const { path } = req.query;

  const minioUrl = `http://${process.env.DB_HOST}:9000/test/${path.join("/")}`;

  try {
    const response = await fetch(minioUrl);

    if (!response.ok) {
      return res
        .status(response.status)
        .send("Failed to fetch image from MinIO");
    }

    const buffer = await response.buffer();

    res.setHeader("Content-Type", response.headers.get("content-type"));
    res.setHeader("Content-Length", buffer.length);
    res.status(200).send(buffer);
  } catch (error) {
    console.error("Error fetching image from MinIO:", error);
    res.status(500).send("Internal Server Error");
  }
}
