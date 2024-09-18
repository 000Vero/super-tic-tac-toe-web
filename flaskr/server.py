from flask import Flask, render_template
import os

app = Flask(__name__)

# Game route, GET only
@app.route("/", methods=["GET"])
def game():
    return render_template("game.html")




if __name__ == "__main__":
    # Run the application
    app.run(debug=True if os.getenv("TTTDEV") == "true" else False, host="0.0.0.0")