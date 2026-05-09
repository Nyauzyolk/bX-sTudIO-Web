# bX-sTudIO-Web
- This is bX-sTudIO's Main Web By Nyauzyolk(Misono Ichika/Twilight)
- Use [Vue](https://cn.vuejs.org/) + [Vue-Router](https://router.vuejs.org/zh/) + [Pinia](https://pinia.vuejs.org/) + [Naive-UI](https://www.naiveui.com/zh-CN/os-theme) + [vfonts](https://www.npmjs.com/package/vfonts) + [xicons](https://www.xicons.org/#/) + [Maple Hand](https://github.com/subframe7536/maple-font)
## Install Dependencies
```bash
npm install
```
## Run
```bash
npm run dev
```
## Build
```bash
npm run build
```
```bash
npm run preview
```

## Server Config（If You Use Nginx，Refresh Site 404，Add This Config to Nginx Config）
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```
