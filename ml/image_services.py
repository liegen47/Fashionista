import torch
import torchvision
from flask import Flask, request, jsonify
from PIL import Image
import base64
from flask_cors import CORS
import json
import torch
import torchvision
import numpy as np
import os
from PIL import Image
import uuid


app = Flask(__name__)
CORS(app)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Define the directory where images will be saved
image_dir = './images/'

# Define the image size
IMG_SIZE = 128

# Define the FeatureExtractor class
class FeatureExtractor(torch.nn.Module):
    def __init__(self):
        super(FeatureExtractor, self).__init__()
        self.feature_extractor = torchvision.models.vgg19(weights=None)
        state_dict = torchvision.models.vgg19(pretrained=True).state_dict()
        self.feature_extractor.load_state_dict(state_dict)
        for param in self.feature_extractor.parameters():
            param.requires_grad = False

    def forward(self, input_image):
        features = self.feature_extractor(input_image)
        return features



# Define the normalization parameters for image transformation
normalization_mean = [0.485, 0.456, 0.406]
normalization_std = [0.229, 0.224, 0.225]

# Define the image transformation pipeline
image_transforms = torchvision.transforms.Compose([
    torchvision.transforms.Resize((IMG_SIZE, IMG_SIZE)),
    torchvision.transforms.ToTensor(),
    torchvision.transforms.Normalize(mean=normalization_mean, std=normalization_std)
])

# Define a function to load images
def load_image(image_path, image_transformer, search_img=False):
    if not search_img:
        image = Image.open(os.path.join(image_dir, image_path))
    else:
        image = Image.open(image_path)
    transformed_image = image_transformer(image).unsqueeze(0)
    return transformed_image

# Define a function to calculate Euclidean distance between feature vectors
def calculate_euclidean_distance(feature_vector_1, feature_vector_2):
    print("Feature Vector 1 Shape:", feature_vector_1.shape)
    print("Feature Vector 2 Shape:", feature_vector_2.shape)
    distance = torch.sqrt(torch.sum((feature_vector_1 - feature_vector_2) ** 2))
    print("Euclidean Distance:", distance.item())
    return distance


# Define a function to calculate k similar images
def calculate_k_similar_images(input_image, search_list, k, model):
    print("Images to search:", search_list)
    score_list = []
    input_image_tensor = load_image(input_image, image_transforms, search_img=True).to(device)
    input_image_feature = model(input_image_tensor)

    for image_path in search_list:
        search_image_tensor = load_image(image_path, image_transforms).to(device)
        search_image_feature = model(search_image_tensor)
        euclidean_distance = calculate_euclidean_distance(input_image_feature, search_image_feature)
        score_list.append({'image_id': image_path, 'score': euclidean_distance.item()})

    k_images = sorted(score_list, key=lambda x: x['score'])[:k]
    return k_images




@app.route('/save_img/', methods=['POST'])
def image_save():
    try:
        form_data = json.loads(request.data)
        
        image_name = form_data['name']
        print(image_name) 
        base_64_img = form_data['image']
        img_file = base64.b64decode(str(base_64_img))
       
        with open(os.path.join(image_dir, image_name), 'wb') as f:
            f.write(img_file)
    except Exception as e:
        print(str(e))  # Print any error that occurs during image saving
        return jsonify(message=str(e))
    return jsonify(message='Image saved to Flask')


@app.route('/search_img/', methods=['POST'])
def image_search():
    try:
        form_data = json.loads(request.data)
        base_64_img = form_data['image']
        img_file = base64.b64decode(str(base_64_img))
        image_name = str(uuid.uuid1()) + '.jpg'
        with open(image_name, 'wb') as f:
            f.write(img_file)
        model = FeatureExtractor()
        model = model.to(device)
        images_to_search = [os.path.join(image_dir, img) for img in os.listdir(image_dir)]
        similar_images_score = calculate_k_similar_images(image_name, [img for img in os.listdir(image_dir)], 5, model)
        similar_images = []
        for image in similar_images_score:
            similar_images.append({
                'image_id': image['image_id'],
                'score': image['score']
            })
        os.remove(image_name)
        return jsonify(similar_images=similar_images)
    except Exception as e:
        print("Error occurred:", str(e))
        return jsonify(message=str(e))



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
