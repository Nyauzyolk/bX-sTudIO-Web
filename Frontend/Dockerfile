FROM node:22-alpine AS builder

# 添加构建参数
ARG VITE_BACKEND_URL
ARG VITE_DOWNLOADS_JSON_URL

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# 使用构建参数设置环境变量，如果没有提供则使用默认值
ENV VITE_BACKEND_URL=http://localhost:3000
ENV VITE_DOWNLOADS_JSON_URL=

RUN npm run build

FROM nginx:alpine

# 创建 SSL 目录
RUN mkdir -p /etc/nginx/ssl

# 删除默认配置目录中的所有内容
RUN rm -rf /etc/nginx/conf.d/*

# 复制 nginx 模板配置为正确的模板文件名
COPY nginx.conf /etc/nginx/templates/default.conf.template

# 复制构建好的静态文件
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 443

# 设置默认环境变量
ENV NGINX_HOST=localhost

CMD ["nginx", "-g", "daemon off;"]