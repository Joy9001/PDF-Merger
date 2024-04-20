import express from "express";
import multer from "multer";
import path from "path";
import PDFMerger from "pdf-merger-js";
const upload = multer({ dest: "/tmp/uploads" });
const app = express();
const port = 3000;

const mergePdfs = async (p) => {
	var merger = new PDFMerger();

	for (let i = 0; i < p.length; i++) {
		await merger.add(p[i].path);
	}

	let n = new Date().getTime();
	await merger.save(path.join(process.cwd(), `tmp/uploads/merged_${n}.pdf`));

	return n;
};

app.use("/static", express.static("tmp/uploads"));
app.use(express.static(path.join(process.cwd(), "src")));

app.get("/", (req, res) => {
	res.sendFile("index.html", {
		root: path.join(process.cwd(), "src/templates"),
	});
});

app.get("/merge", (req, res) => {
	res.sendFile("merge.html", {
		root: path.join(process.cwd(), "src/templates"),
	});
});

app.post("/merge", upload.array("pdfs", 12), async (req, res, next) => {
	let n = await mergePdfs(req.files);
	res.redirect(`http://localhost:${port}/static/merged_${n}.pdf`);
});

app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port}`);
});
