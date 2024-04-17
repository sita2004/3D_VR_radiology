from data_3d import *
import torch
from torch.utils.data import DataLoader
from unet_3d import *

class HeartModel:
    def __init__(self):
        self.soft = torch.nn.Softmax(dim=1)
        self.keep_largest = mt.KeepLargestConnectedComponent(applied_labels=[0, 1, 2, 3], independent=True)

    def Pad_images(self, image):
        orig_shape = list(image.size())
        original_x = orig_shape[2]
        original_y = orig_shape[3]
        original_z = orig_shape[4]
        new_x = (16 - (original_x % 16)) + original_x
        new_y = (16 - (original_y % 16)) + original_y
        new_z = original_z
        new_shape = [new_x, new_y, new_z]
        b, c, h, w, d = image.shape
        m = image.min()
        x_max = new_shape[0]
        y_max = new_shape[1]
        z_max = new_shape[2]
        result = torch.Tensor(b, c, x_max, y_max, z_max).fill_(m)
        xx = (x_max - h) // 2
        yy = (y_max - w) // 2
        zz = (z_max - d) // 2
        result[:, :, xx:xx + h, yy:yy + w, zz:zz + d] = image
        return result, tuple([xx, yy, zz])  # result is a torch tensor in CPU --> have to move to GPU


    # pass the padded image, the indices and the original shape
    def UnPad_imges(self, image, indices, org_shape):
        b, c, h, w, d = org_shape
        xx = indices[0]
        yy = indices[1]
        zz = indices[2]
        return image[:, :, xx:xx + h, yy:yy + w, zz:zz + d]  # image is a torch tensor --> have to move to GPU


    def save_pred(self, pred, outpath, idx, aff):
        # Folder to save the results
        if not os.path.exists(os.path.join(outpath, "prediction")):
            os.makedirs(os.path.join(outpath, "prediction"))
        out_save_path_pred = os.path.join(outpath, "prediction", "pred_heart" + '.nii.gz')

        aff = aff.squeeze().cpu()
        affine = np.diag([torch.diagonal(aff)[0], torch.diagonal(aff)[1],
                          torch.diagonal(aff)[2], torch.diagonal(aff)[3]])

        # Save predictions
        # Post Processing
        final_prediction = torch.argmax(pred, dim=1)
        final_prediction = self.keep_largest(final_prediction)
        final_pred = np.array(final_prediction.cpu().squeeze())

        # Convert the data type to uint8
        final_pred = final_pred.astype(np.uint8)

        # Save the resampled predictions
        final_pred = nib.Nifti1Image(final_pred, affine)
        nib.save(final_pred, out_save_path_pred)



    def heart_pred(self, input_image_path):

        test_transform = mt.Compose([
            mt.ToTensorD(keys=["image"], allow_missing_keys=False)
        ])
        
        # Test dataset
        test_data = DataLoader(
            ACDC_3D(source=input_image_path, index=1, transform=test_transform),
            batch_size=1,
            shuffle=False
        )


        model_path = str(Path(r"C:\Users\Y PAVANI\Downloads\The Fast API App (4)\The Fast API App\UNet3D_Best_0.5_Fold_2.pt"))
        if not os.path.exists(r'heart_res/'):
            os.makedirs(r'heart_res/')
        result_path = r'heart_res/'
        
        # Load the model on the CPU
        model = torch.load(model_path, map_location=torch.device('cpu'))
        with torch.no_grad():
            model.eval()

        items = next(iter(test_data))
        image = items["image"]
        image_shape = image.shape

        # pad the image
        image, ind = self.Pad_images(image)
        pred = model(image.float())
        img_affine = items['image_meta_dict']['affine']
        image_affine_original = items['image_meta_dict']['original_affine']

        # unpad the images
        pred = self.UnPad_imges(pred, ind, image_shape)

        pred = self.soft(pred)

        # Save results
        self.save_pred(pred, result_path, 0, image_affine_original)  # Use index 0
        print("saved results")
        self.convert_obj(r"heart_res\prediction\pred_heart.nii.gz")


      
    
    def convert_obj(self, nii_path):

        import nibabel as nib
        import numpy as np
        from skimage import measure

        output_obj="heartobj_pred.obj"
        print("start img to obj")
        # Load NIfTI image
        nifti_img = nib.load(nii_path)
        data = nifti_img.get_fdata()
        print("starting image to obj")
        # Extract mesh using skimage.measure
        verts, faces, _, _ = measure.marching_cubes(data, level=0, spacing=nifti_img.header.get_zooms())
        print("writing img.obj")
        # Save mesh as OBJ
        with open(output_obj, 'w') as obj_file:
            for v in verts:
                obj_file.write(f"v {v[0]} {v[1]} {v[2]}\n")
            for f in faces:
                obj_file.write(f"f {f[0]+1} {f[1]+1} {f[2]+1}\n")
        print("img to obj done")



