# import pandas as pd
# from sklearn.compose import ColumnTransformer
# from sklearn.pipeline import Pipeline
# from sklearn.preprocessing import StandardScaler, OneHotEncoder
# from sklearn.linear_model import LinearRegression
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import mean_squared_error
# from flask import Flask, request, jsonify
# from flask_cors import CORS

# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)

# # Load dataset
# data = pd.read_csv("C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\Ml\\budgetval.csv")

# # Define features and target variables
# X = data.drop(columns=["Total Buy Price", "Total Maintenance Cost", "Total Price", "Annual Budget"])
# y_buy_price = data["Total Buy Price"]
# y_maintenance_cost = data["Total Maintenance Cost"]

# # Define category list
# categories = [
#     "Communication Devices", "Computer and IT Equipment", "Firearms",
#     "Forensic", "Medical First Aid", "Networking Equipment",
#     "Office Supplies", "Protective Gear", "Surveillance and Tracking",
#     "Vehicle and Accessories"
# ]

# # Preprocessing pipeline
# preprocessor = ColumnTransformer(
#     transformers=[
#         ("num", StandardScaler(), ["Year"]),
#         ("cat", OneHotEncoder(categories=[categories]))
#     ]
# )

# # Define models
# model_buy_price = Pipeline(steps=[
#     ("preprocessor", preprocessor),
#     ("regressor", LinearRegression())
# ])

# model_maintenance_cost = Pipeline(steps=[
#     ("preprocessor", preprocessor),
#     ("regressor", LinearRegression())
# ])

# # Train-test split
# X_train, X_test, y_train_buy, y_test_buy, y_train_maintenance, y_test_maintenance = train_test_split(
#     X, y_buy_price, y_maintenance_cost, test_size=0.2, random_state=42
# )

# # Fit models
# model_buy_price.fit(X_train, y_train_buy)
# model_maintenance_cost.fit(X_train, y_train_maintenance)

# # Predictions for validation
# y_pred_buy = model_buy_price.predict(X_test)
# y_pred_maintenance = model_maintenance_cost.predict(X_test)

# y_pred_total_price = y_pred_buy + y_pred_maintenance
# y_pred_annual_budget = y_pred_total_price * 1.2

# # Calculate MSE for Total Price
# actual_total_price = data.loc[X_test.index, "Total Price"]
# mse_total_price = mean_squared_error(actual_total_price, y_pred_total_price)
# print(f"MSE for Total Price: {mse_total_price}")

# # API endpoint for predictions
# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.json
#         if not {"Year", "Category"}.issubset(data.keys()):
#             return jsonify({"error": "Invalid input. Please provide 'Year' and 'Category'."}), 400
        
#         if data["Category"] not in categories:
#             return jsonify({"error": f"Invalid category. Choose from {categories}."}), 400

#         sample_input = pd.DataFrame([data])
#         sample_buy = model_buy_price.predict(sample_input)
#         sample_maintenance = model_maintenance_cost.predict(sample_input)
#         sample_total_price = sample_buy + sample_maintenance
#         sample_annual_budget = sample_total_price * 1.2

#         return jsonify({
#             "buy_price": sample_buy.tolist(),
#             "maintenance_cost": sample_maintenance.tolist(),
#             "total_price": sample_total_price.tolist(),
#             "annual_budget": sample_annual_budget.tolist()
#         })
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Only allow requests from this origin


# Load dataset
data = pd.read_csv("C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\Ml\\budgetval.csv")

# Verify dataset columns
print("Columns in dataset:", data.columns)

# Define features and target variables
X = data.drop(columns=["Total Buy Price", "Total Maintenance Cost", "Total Price", "Annual Budget"])
y_buy_price = data["Total Buy Price"]
y_maintenance_cost = data["Total Maintenance Cost"]

# Check feature columns
print("Feature columns:", X.columns)

# Preprocessing
preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), ["Year"]),  # Ensure "Year" exists in the dataset
        ("cat", OneHotEncoder(), ["Category"])  # Ensure "Category" exists in the dataset
    ]
)

# Define pipelines
model_buy_price = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", LinearRegression())
])

model_maintenance_cost = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", LinearRegression())
])

# Train-test split
X_train, X_test, y_train_buy, y_test_buy, y_train_maintenance, y_test_maintenance = train_test_split(
    X, y_buy_price, y_maintenance_cost, test_size=0.2, random_state=42
)

# Fit models
model_buy_price.fit(X_train, y_train_buy)
model_maintenance_cost.fit(X_train, y_train_maintenance)

# Predictions
y_pred_buy = model_buy_price.predict(X_test)
y_pred_maintenance = model_maintenance_cost.predict(X_test)

y_pred_total_price = y_pred_buy + y_pred_maintenance
y_pred_annual_budget = y_pred_total_price * 1.2

# Calculate MSE for Total Price
actual_total_price = data.loc[X_test.index, "Total Price"]
mse_total_price = mean_squared_error(actual_total_price, y_pred_total_price)
print(f"MSE for Total Price: {mse_total_price}")

# Flask API setup
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    sample_input = pd.DataFrame(data)
    sample_buy = model_buy_price.predict(sample_input)
    sample_maintenance = model_maintenance_cost.predict(sample_input)
    sample_total_price = sample_buy + sample_maintenance
    sample_annual_budget = sample_total_price * 1.2

    return jsonify({
        "buy_price": sample_buy.tolist(),
        "maintenance_cost": sample_maintenance.tolist(),
        "total_price": sample_total_price.tolist(),
        "annual_budget": sample_annual_budget.tolist()
    })

if __name__ == '__main__':
    app.run(debug=True)
