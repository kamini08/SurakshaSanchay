# import matplotlib.pyplot as plt
# import pandas as pd
# df=pd.read_csv('hardware_inventory_realistic_prices.csv')
# plt.plot(kind='line', x=y_test.head(30), y=y_pred[:30], marker='o', color="blue")
# plt.title("Actual Prices vs Predicted Prices")
# plt.xlabel("Actual Prices")
# plt.ylabel("Predicted Prices")
# plt.show()
import io
import base64
from flask import Flask, send_file
from flask_cors import CORS
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas

app = Flask(__name__)
CORS(app)

@app.route('/plot', methods=['GET'])
def plot_chart():
    # Create the figure and plot
    fig, ax = plt.subplots()
    ax.plot(y_test_values.values, label='Actual Prices', marker='o', color='blue')
    ax.plot(y_pred_values, label='Predicted Prices', marker='x', color='green')
    ax.set_title("Actual Prices vs Predicted Prices")
    ax.set_xlabel("Sample Index")
    ax.set_ylabel("Price")
    ax.legend()

    # Convert plot to PNG image in memory
    img = io.BytesIO()
    FigureCanvas(fig).print_png(img)
    img.seek(0)
    
    # Send as a response
    return send_file(img, mimetype='image/png')
