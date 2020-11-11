
echo 'yarn install from init_ios.sh ...'
NODE_ENV=development yarn install  --registry https://registry.npm.taobao.org/

cd ios
pod install
cd ..
