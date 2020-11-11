#! /bin/bash
echo "toefl-mobile react-native cleaning:"
echo "1/4 Cleanning watchman ..."
watchman watch-del-all

echo "2/4 Cleanning node_modules ..."
rm -rf node_modules/

echo "3/4 Cleanning tmp ..."

# rm -fr $TMPDIR
# rm -rf /tmp/metro-*
echo "3/4 Cleanning Metro Bundler cache ..."
rm -fr $TMPDIR/metro-*

echo "4/4 Cleanning haste cache ..."
rm -fr $TMPDIR/hsperfdata_admin