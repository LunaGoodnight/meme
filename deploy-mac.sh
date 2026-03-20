#!/bin/bash
set -e  # Exit on any error

# ============================================
# CHANGE THESE 3 VALUES:
# ============================================
USERNAME="catsheue"
VPS_HOST="178.128.16.199"
VPS_PORT="11233"
VPS_PATH="/srv/projects/meme"
# ============================================

IMAGE_NAME="meme-frontend"
FULL_IMAGE="${USERNAME}/${IMAGE_NAME}:latest"
API_URL="https://api.meme.vividcats.org"

echo "Step 1: Building Docker image..."
docker build --no-cache --platform linux/amd64 --build-arg NEXT_PUBLIC_API_URL="${API_URL}" -t "${FULL_IMAGE}" .

echo "Step 2: Pushing to Docker Hub..."
docker push "${FULL_IMAGE}"

echo "Step 3: Deploying to VPS..."
ssh -p "${VPS_PORT}" "root@${VPS_HOST}" << EOF
  cd ${VPS_PATH}
  git pull
  docker compose down
  docker pull ${FULL_IMAGE}
  docker compose up -d
EOF

echo "Done!"
