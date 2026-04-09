# Next.js Captive Portal Template for OPNsense

<img width="1279" height="679" alt="image" src="https://github.com/user-attachments/assets/bdce4ae5-238e-4a2a-9406-3054158d5e05" />

<img width="1277" height="673" alt="image" src="https://github.com/user-attachments/assets/63110d24-f64c-4782-a2b0-58534c62551a" />

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## For buidling and upload to OPNsense
1. Run `npm run build`
2. Pack all content inside `out` folders to zip
   <img width="742" height="432" alt="image" src="https://github.com/user-attachments/assets/4006c5f1-f4bf-4ff1-9480-0525f4957384" />
3. Go to captive portal settings in OPNsense and upload the file it
   <img width="489" height="332" alt="image" src="https://github.com/user-attachments/assets/60650886-18a9-433a-a267-073ad676f700" />
4. Then settings your zone to use this template
   <img width="612" height="177" alt="image" src="https://github.com/user-attachments/assets/a4d72c18-341c-4a2e-a257-44fd094dc36a" />

# License
This project is under MIT License
