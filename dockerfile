FROM node:alpine

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

# Default command
CMD ["npm", "run", "j"]
