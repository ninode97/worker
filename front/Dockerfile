FROM node:alpine
WORKDIR "/front"
COPY ./package.json .
RUN npm install -g yarn
COPY . .
CMD ['yarn', 'start']