#!/bin/bash

for col in `seq 0 13`; do
  for row in `seq 0 7`; do
    echo ".sprite-pos-$col-$row { object-position: $((-32 * col))px $((-32 * row))px; }"
  done
done
