#!/bin/bash

MODE=${mode}
DIST_ZIP_NAME="dist.zip"
REMOTE_USER="root"
DEPLOY_PATH="/root/mono"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'


log_info() {
    echo -e "${BLUE}[INFO] $1${NC}"
}

log_success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

log_error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

source "$(dirname "$0")/../.env.local"

if [ "$MODE" = "lab" ]; then
    REMOTE_HOST="$LAB_HOST"
    PRIVATE_KEY="$LAB_PRIVATE_KEY"
elif [ "$MODE" = "production" ]; then
    REMOTE_HOST="$PRODUCTION_HOST"
    PRIVATE_KEY="$PRODUCTION_PRIVATE_KEY"
else
    log_error "[ERROR] UNKNOWN MODE: $MODE"
    exit 1
fi

if [ -z "$REMOTE_HOST" ]; then
    log_error "REMOTE_HOST is not set for environment: $MODE"
    exit 1
fi

if [ -z "$PRIVATE_KEY" ]; then
    log_error "PRIVATE_KEY is not set for environment: $MODE"
    exit 1
fi

TEMP_KEY_FILE=$(mktemp)
echo "$PRIVATE_KEY" > "$TEMP_KEY_FILE"
chmod 600 "$TEMP_KEY_FILE"

# ssh-keygen -R $REMOTE_HOST
# ssh-keyscan -H $REMOTE_HOST >> ~/.ssh/known_hosts

log_info "uploading $DIST_ZIP_NAME to $REMOTE_HOST..."
log_info "$$TEMP_KEY_FILE"
# sshpass -p "$REMOTE_PASS" scp $DIST_ZIP_NAME $REMOTE_USER@$REMOTE_HOST:$DEPLOY_PATH
scp -i "$TEMP_KEY_FILE" "$DIST_ZIP_NAME" "$REMOTE_USER@$REMOTE_HOST:$DEPLOY_PATH"
if [ $? -ne 0 ]; then
    log_error "upload failed"
    rm -f "$TEMP_KEY_FILE"
    exit 1
fi

log_info "checking and installing unzip..."
ssh -i "$TEMP_KEY_FILE" "$REMOTE_USER@$REMOTE_HOST" "which unzip > /dev/null 2>&1 || (sudo apt update && sudo apt install -y unzip)"

log_info "unzip $DIST_ZIP_NAME..."
# sshpass -p "$REMOTE_PASS" ssh $REMOTE_USER@$REMOTE_HOST "unzip -q -o $DEPLOY_PATH/$DIST_ZIP_NAME -d $DEPLOY_PATH && rm $DEPLOY_PATH/$DIST_ZIP_NAME"
ssh -i "$TEMP_KEY_FILE" "$REMOTE_USER@$REMOTE_HOST" "unzip -q -o $DEPLOY_PATH/$DIST_ZIP_NAME -d $DEPLOY_PATH && rm $DEPLOY_PATH/$DIST_ZIP_NAME"
if [ $? -ne 0 ]; then
    log_error "remote unzip failed"
    rm -f "$TEMP_KEY_FILE"
    exit 1
fi

rm -f "$TEMP_KEY_FILE"

log_success "deployed to $REMOTE_HOST:$DEPLOY_PATH $MODE successfully"