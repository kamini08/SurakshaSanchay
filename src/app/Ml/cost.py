from flask import Flask, jsonify, make_response
from flask_cors import CORS
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
import pandas as pd

app = Flask(__name__)

# Enable CORS for specific origins
CORS(app, origins=["http://localhost:3000"])

# Load and process the dataset
df = pd.read_csv("C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\Ml\\trial1.csv")

# Feature selection and target variable
X = df[["Category", "Quantity", "Condition", "Average_Maintenance_Charge", "Item_Age(years)", "Return_Duration(days)"]]
y = df["Price"]

# One-hot encoding for categorical variables
X = pd.get_dummies(X, columns=["Category", "Condition"], drop_first=True).astype(int)

# Splitting data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
price_model = RandomForestRegressor(n_estimators=100, random_state=42)
price_model.fit(X_train, y_train)

# Make predictions and calculate Mean Squared Error
y_pred = price_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")

# Convert y_test and y_pred to lists so they can be returned as JSON
y_test_list = y_test.head(30).tolist()
y_pred_list = y_pred[:30].tolist()

# Define a route that returns the data
@app.route('/get_chart_data')
def get_chart_data():
    response = make_response(jsonify({
        "y_test": y_test_list,
        "y_pred": y_pred_list
    }))
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    return response

if __name__ == '__main__':
    app.run(debug=True)

