from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
	return jsonify(message="Hello World!")

@app.route('/test')
def test():
	edad = 10
	return jsonify(message=f"Hello Test! {edad} años")

# List of emojis you might want to return
emojis = ["😀", "😎", "😂", "😍", "🥺", "😜", "😇", "🥳", "😈", "😱", "🙃", "🤔", "😏", "🤩"]

@app.route('/random-emoji', methods=['GET'])
def random_emoji():
    random_emoji = random.choice(emojis)
    return jsonify({'emoji': random_emoji})


if __name__ == '__main__':
	app.run(host='0.0.0.0', port=8000)