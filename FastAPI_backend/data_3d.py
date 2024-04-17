
import os
import monai.transforms as mt
import numpy as np
from pathlib import Path
from torch.utils.data.dataset import Dataset


def normalize(data):
    data = (data - data.mean()) / data.std()
    return data

class ACDC_3D(Dataset):
    def __init__(self, source, index, transform=None):
        # Basic transforms
        self.loader = mt.LoadImaged(keys=["image"])
        self.add_channel = mt.AddChannelD(keys=["image"])
        self.spacing = mt.Spacingd(keys=["image"], pixdim=(1.25, 1.25, 10.0), mode=("nearest"))
        self.transform = transform or mt.Compose([
            mt.SpatialPadD(keys=["image"], spatial_size=tar_shape),
            mt.ToTensorD(keys=["image"], allow_missing_keys=False)
        ])

        ED_frame = 1  # Choose the ED frame, you can modify this as needed
        ED_img = source

        self.data = {"image": ED_img}

    def __len__(self):
        return 1  # Always return 1 as there's only one image

    def __getitem__(self, idx):
        data_return = self.loader(self.data)
        data_return = self.add_channel(data_return)
        data_return = self.spacing(data_return)
        data_return["image"] = normalize(data_return["image"])
        data_return = self.transform(data_return)
        return data_return


# Target/crop shape for the images and masks when training
tar_shape = [300, 300, 10]
crop_shape = [224, 224, 10]



