FROM denoland/deno:1.13.2
EXPOSE 80
WORKDIR /app
ADD . .
CMD ["run", "-A", "main.js"]