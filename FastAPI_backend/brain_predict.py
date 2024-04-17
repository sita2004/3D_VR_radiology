class brain_model:
    def brain_pred(input_file):
        print("brain_pred function started")
        import os
        import glob
        import torch
        import numpy as np
        import nibabel as nib
        import matplotlib.pyplot as plt
        import monai
        from monai.utils import first, set_determinism
        import shutil
        import tempfile
        import time
        from monai.apps import DecathlonDataset
        from monai.config import print_config
        from monai.data import DataLoader, decollate_batch
        from monai.handlers.utils import from_engine
        from monai.losses import DiceLoss
        from monai.inferers import sliding_window_inference
        from monai.metrics import DiceMetric
        from monai.networks.nets import SegResNet
        from monai.transforms import (
            Activations,
            Activationsd,
            AsDiscrete,
            AsDiscreted,
            Compose,
            Invertd,
            LoadImaged,
            MapTransform,
            NormalizeIntensityd,
            Orientationd,
            RandFlipd,
            RandScaleIntensityd,
            RandShiftIntensityd,
            RandSpatialCropd,
            Spacingd,
            EnsureTyped,
            EnsureChannelFirstd,
        )
        from monai.data import (
            CacheDataset,                # A dataset that caches data in memory for faster access
            DataLoader,                 # DataLoader for iterating over batches of data
            Dataset,                    # Base dataset class for MONAI
            decollate_batch,             # Separate a batch of data into individual samples
        )
        from monai.networks.nets import SegResNet
        from monai.losses import DiceLoss
        from monai.metrics import DiceMetric
        from monai.transforms import Activations  # Import the Activations module
        from monai.networks.nets import UNet
        from monai.networks.layers import Norm
        from monai.transforms import Compose, AsDiscrete
        from monai.inferers import sliding_window_inference
        from monai.transforms import SaveImaged
        import nibabel as nib
        import numpy as np
        from skimage import measure
        print("Transformations imported")
        VAL_AMP = True

        # standard PyTorch program style: create SegResNet, DiceLoss and Adam optimizer
        device = torch.device("cpu")
        print("fetched cpu device")
        model = SegResNet(
            blocks_down=[1, 2, 2, 4],
            blocks_up=[1, 1, 1],
            init_filters=16,
            in_channels=4,
            out_channels=3,
            dropout_prob=0.2,
        ).to(device)
        post_trans = Compose([Activations(sigmoid=True), AsDiscrete(threshold=0.5)])


        # define inference method
        def inference(input):
            def _compute(input):
                return sliding_window_inference(
                    inputs=input,
                    roi_size=(96, 96, 96),
                    sw_batch_size=1,
                    predictor=model,
                    overlap=0.5,
                )
            return _compute(input)
        test_files=[
            {"image": input_file}
        ]
        test_transform = Compose(
            [
                LoadImaged(keys=["image"]),
                EnsureChannelFirstd(keys="image"),
                EnsureTyped(keys=["image"]),
                Orientationd(keys=["image"], axcodes="RAS"),
                Spacingd(
                    keys=["image"],
                    pixdim=(1.0, 1.0, 1.0),
                    mode=("bilinear"),
                ),
                NormalizeIntensityd(keys="image", nonzero=True, channel_wise=True),
            ]
        )
        test_ds = Dataset(data=test_files, transform=test_transform)

        # Create a data loader for the testing dataset with a batch size of 1
        test_loader = DataLoader(test_ds, batch_size=1)

        post_transforms = Compose(
            [
                Invertd(
                    keys="pred",
                    transform=test_transform,
                    orig_keys="image",
                    meta_keys="pred_meta_dict",
                    orig_meta_keys="image_meta_dict",
                    meta_key_postfix="meta_dict",
                    nearest_interp=False,
                    to_tensor=True,
                    device="cpu",
                ),
                Activationsd(keys="pred", sigmoid=True),
                AsDiscreted(keys="pred", threshold=0.5),
                SaveImaged(keys="pred", meta_keys="pred_meta_dict", output_dir="./out_brain", output_postfix="seg_brain", resample=False),
            ]
        )
        print("post transforms defined")
        model.load_state_dict(torch.load("C://Users//Y PAVANI//Downloads//The Fast API App (4)//The Fast API App//brain_best_metric_model.pth", map_location=torch.device('cpu')))
        model.eval()
        
        print("model loaded")

        with torch.no_grad():
            for test_data in test_loader:
                test_inputs = test_data["image"].to(device)
                test_data["pred"] = inference(test_inputs)
                test_data = [post_transforms(i) for i in decollate_batch(test_data)]
                test_outputs = from_engine(["pred"])(test_data)
        import os
        import glob
        print("post transforms applied")
        folder = 'out_brain'
        subfolders = [f.path for f in os.scandir(folder) if f.is_dir()]

        
        subfolder_path = subfolders[0]
        file_list = glob.glob(os.path.join(subfolder_path, '*'))

        if len(file_list) == 1 and os.path.isfile(file_list[0]):
            print(f'The file is: {file_list[0]}')
        else:
            print('No file or multiple files found in the subfolder.')
        

        print("file list fetched")
        
            # Load NIfTI image
        nifti_img = nib.load(file_list[0])
        data = nifti_img.get_fdata()

            # Select a specific time frame (4th dimension)
        selected_data = data[..., 0]

            # Extract voxel spacing from NIfTI header
        voxel_spacing = nifti_img.header.get_zooms()[:3]

            # Extract mesh using skimage.measure
        verts, faces, _, _ = measure.marching_cubes(selected_data, level=0, spacing=voxel_spacing)

            # Save mesh as OBJ
            
        with open('C://Users//Y PAVANI//Downloads//The Fast API App (4)//The Fast API App//brain_obj_pred.obj', 'w') as obj_file:
            for v in verts:
                obj_file.write(f"v {v[0]} {v[1]} {v[2]}\n")
            for f in faces:
                obj_file.write(f"f {f[0]+1} {f[1]+1} {f[2]+1}\n")
    #pred('D://ProjectSchool//3D_VR_Radiology//Brain_Data//Images//BRATS_030.nii')