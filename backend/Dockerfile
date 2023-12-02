FROM golang:1.21.4-alpine3.18 as build-env

RUN mkdir /backend
WORKDIR /backend
COPY go.mod .
COPY go.sum .

RUN go mod download
COPY . .

ENTRYPOINT [ "go", "run", "cmd/app/main.go" ]
