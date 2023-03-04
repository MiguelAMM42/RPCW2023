import os
import json

def adID(filename, numElem):
    with open(filename,"r", encoding="utf-8") as f:
        data = json.load(f)
        f.close()

    for entry in data["pessoas"]:
        entry.update({"id": f"p{numElem+1}"})
        numElem += 1

    return data["pessoas"], numElem

numElem = 0
joinedData = {"pessoas": []}

ds , numElem = adID("datasets/dataset.json", numElem)
joinedData["pessoas"] = joinedData["pessoas"] + ds
ds1, numElem = adID("datasets/dataset-extra1.json", numElem)
joinedData["pessoas"] = joinedData["pessoas"] + ds1
ds2, numElem = adID("datasets/dataset-extra2.json", numElem)
joinedData["pessoas"] = joinedData["pessoas"] + ds2
ds3, numElem = adID("datasets/dataset-extra3.json", numElem)
joinedData["pessoas"] = joinedData["pessoas"] + ds3

with open("joinedDataset/joined-dataset.json","w", encoding="utf-8") as f:
    json.dump(joinedData,f, indent=4, ensure_ascii=False)
    f.close()

