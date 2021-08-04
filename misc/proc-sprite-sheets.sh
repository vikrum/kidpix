for filename;
do 
echo cols
# remove cols
for moo in `seq 0 32 448`; do
  for zoo in `seq 0 257`; do
    convert $filename -fill white -draw "point $moo, $zoo" $filename
  done
done

echo rows
#remove rows
for moo in `seq 0 32 256`; do
  for zoo in `seq 0 449`; do
    convert $filename -fill white -draw "point $zoo, $moo" $filename
  done
done

convert $filename -flatten $filename
`dirname "$0"`/remove-bg.sh $filename

done

