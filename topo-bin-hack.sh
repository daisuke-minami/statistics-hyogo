#!/bin/sh

linkdir="node_modules/topojson/node_modules/topojson-client/bin"

mkdir -p "$linkdir"

declare -a arr=("topo2geo" "topomerge" "topoquantize")

for t in "${arr[@]}"; do
	target="\$basedir/../topojson-client/bin/$t"
	link="$linkdir/$t"
	echo \"$target\" \"\$@\" > "$link"
	echo 'exit $?' >> "$link"
done