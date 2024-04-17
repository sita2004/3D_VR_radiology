from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import io
import subprocess
from pathlib import Path
from model import monaimodel
from brain_predict import brain_model
from heart import HeartModel
from unet_3d import *
from data_3d import *
from unet_3d import Train_3D

app = FastAPI()
origins = ["http://localhost:3000"]  

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Global variable to store the uploaded file content
global_file_content = None

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    global global_file_content
    global_file_content = await file.read()
    print("file read")
    # Save the file with a specific filename, such as "example.obj"
    #filename = global_file_content.filename
    with open("my.nii.gz", "wb") as f:
         f.write(global_file_content)
    print("file saved")
    monaimodel.predict("my.nii.gz")
    return {"filename": "good"}

@app.post("/uploadbrainfile/")
async def create_brain_upload_file(file: UploadFile = File(...)):
    global global_file_content
    global_file_content = await file.read()
    print("file read")
    # Save the file with a specific filename, such as "example.obj"
    #filename = global_file_content.filenamemernproj\mernweb\The Fast API App\out_brain\BRATS_030\BRATS_030_seg_brain.nii.gz
    with open("my_brain.nii.gz", "wb") as f:
         f.write(global_file_content)
    print("file saved")
    brain_model.brain_pred("my_brain.nii.gz")
    return {"filename": "good"}

@app.post("/uploadHeartFile/")
async def create_heart_upload_file(file: UploadFile = File(...)):
    global global_file_content
    global_file_content = await file.read()
    print("file read")
    with open("heart_img.nii", "wb") as f:
         f.write(global_file_content)
    print("file saved")
    HeartModel().heart_pred("heart_img.nii")
    return {"filename": "good"}


@app.get("/get_obj_fil")
async def get_uploaded_file():
    global global_file_content

    if global_file_content is None:
        raise HTTPException(status_code=404, detail="No file uploaded")

    try:
        return StreamingResponse(io.BytesIO(global_file_content), media_type="application/octet-stream", headers={"Content-Disposition": f"attachment; filename=uploaded_file.obj"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
@app.get("/get_obj_file")
def get_obj_file():
    file_path = Path("C://Users//Y PAVANI//Downloads//The Fast API App (4)//The Fast API App//lungs_obj_pred.obj")
    print(file_path)  # Add this line to print the file path
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path=file_path, media_type="application/octet-stream", filename="lung_example.obj")

@app.get("/get_brain_obj_file")
def get_brain_obj_file_route():
    return get_brain_obj_file()
def get_brain_obj_file():
    file_path = Path("C://Users//Y PAVANI//Downloads//The Fast API App (4)//The Fast API App//brain_obj_pred.obj")
    print(file_path)  # Add this line to print the file path
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path=file_path, media_type="application/octet-stream", filename="brain_example.obj")

@app.get("/get_heart_obj_file")
def get_heart_obj_file_route():
    return get_heart_obj_file()
def get_heart_obj_file():
    file_path = Path("C://Users//Y PAVANI//Downloads//The Fast API App (4)//The Fast API App//heart_pred.obj")
    print(file_path)  # Add this line to print the file path
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(path=file_path, media_type="application/octet-stream", filename="heart_example.obj")

@app.post("/open_unreal/")
async def open_unreal():
    # Open Unreal Engine project here
    open_unreal_command = "C:/Users/Y PAVANI/Documents/Unreal Projects/VR Radiology/VR Radiology/MyProject2.uproject"
    subprocess.Popen(open_unreal_command, shell=True)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)