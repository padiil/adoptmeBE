# syntax=docker/dockerfile:1

# Menggunakan image Node.js sebagai base image
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-alpine

# Mengatur environment ke production secara default
ENV NODE_ENV=production

# Menetapkan direktori kerja di dalam container
WORKDIR /usr/src/app

# Menyalin seluruh folder prisma ke dalam container terlebih dahulu
COPY prisma ./prisma

# Menyalin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Menginstal dependencies
RUN npm ci --omit=dev

# Menyalin seluruh kode sumber ke dalam container
COPY . .

# Menjalankan Prisma generate untuk menghasilkan Prisma client
RUN npx prisma generate --schema=/usr/src/app/prisma/schema.prisma

# Mengekspos port yang digunakan oleh aplikasi
EXPOSE 3000

# Menjalankan aplikasi
CMD ["npm", "start"]