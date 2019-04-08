#!/bin/bash

echo "Deploying az-htm"
now --public

echo "Attaching az-htm alias to new deployment"
now alias az-htm

echo "Removing previous deployment"
now rm az-htm --safe --yes

