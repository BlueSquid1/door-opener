set -e

clean() {
  rm -rf build
}

build_frontend() {
  docker build -t frontend_dooropener frontend
  docker create --name temp_frontend_dooropener frontend_dooropener
  rm -rf ./build/dist
  docker cp temp_frontend_dooropener:/dist/ ./build/
  docker rm temp_frontend_dooropener
}

build_backend() {
  docker build -t backend_dooropener backend
  docker create --name temp_backend_dooropener backend_dooropener
  docker cp temp_backend_dooropener:/build/doorOpener ./build/
  docker rm temp_backend_dooropener
}

build() {
  mkdir -p ./build
  build_frontend
  build_backend
}

run() {
  cd build ; ./doorOpener ; cd ..
}

all() {
  build
  run
}

ci() {
  clean
  build
  run
}

$@