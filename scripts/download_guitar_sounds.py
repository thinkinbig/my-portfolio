import os
import requests

# 创建目标目录
target_dir = 'public/sounds/guitar'
os.makedirs(target_dir, exist_ok=True)

# 需要下载的音频文件
notes = ['e2', 'a2', 'd3', 'g3', 'b3', 'e4']

# 下载文件
for note in notes:
    url = f'https://guitar-tuner.org/sounds/acoustic_mp3/{note}.mp3'
    target_path = os.path.join(target_dir, f'{note}.mp3')
    
    print(f'Downloading {url}...')
    response = requests.get(url)
    
    if response.status_code == 200:
        with open(target_path, 'wb') as f:
            f.write(response.content)
        print(f'Successfully downloaded {note}.mp3')
    else:
        print(f'Failed to download {note}.mp3') 