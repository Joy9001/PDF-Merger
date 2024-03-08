import express from 'express';
import path from 'path';
import multer from 'multer';
import PDFMerger from 'pdf-merger-js'
const upload = multer({ dest: 'uploads/' })
const app = express();
const port = 3000;

const mergePdfs = async (p) => {
  var merger = new PDFMerger();

  for (let i = 0; i < p.length; i++) {
    await merger.add(p[i].path);
  }

  let n = new Date().getTime();
  await merger.save(`public/merged_${n}.pdf`);

  return n;
};


app.use('/static', express.static('public'))
app.use(express.static('templates'));

app.get("/", (req, res) => {
  res.sendFile("templates/index.html");
});

app.post('/merge', upload.array('pdfs', 12), async (req, res, next) => {
  let n = await mergePdfs(req.files);
  res.redirect(`http://localhost:${port}/static/merged_${n}.pdf`);
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});