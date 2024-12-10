# # Import necessary libraries
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.metrics import mean_squared_error
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LinearRegression
# from sklearn.preprocessing import OneHotEncoder, StandardScaler
# from sklearn.compose import ColumnTransformer
# from sklearn.pipeline import Pipeline
# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt

# # Load the dataset
# data = pd.read_csv("C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\Ml\\budgetval.csv")

# # Define features and target variables
# X = data.drop(columns=["Total Buy Price", "Total Maintenance Cost", "Total Price", "Annual Budget"])
# y_buy_price = data["Total Buy Price"]
# y_maintenance_cost = data["Total Maintenance Cost"]

# # Preprocessing
# preprocessor = ColumnTransformer(
#     transformers=[
#         ("num", StandardScaler(), ["Year"]),
#         ("cat", OneHotEncoder(), ["Category"])
#     ]
# )

# # Create pipelines for both models
# model_buy_price = Pipeline(steps=[
#     ("preprocessor", preprocessor),
#     ("regressor", LinearRegression())
# ])

# model_maintenance_cost = Pipeline(steps=[
#     ("preprocessor", preprocessor),
#     ("regressor", LinearRegression())
# ])

# # Split the data into training and testing sets
# X_train, X_test, y_train_buy, y_test_buy, y_train_maintenance, y_test_maintenance = train_test_split(
#     X, y_buy_price, y_maintenance_cost, test_size=0.2, random_state=42
# )

# # Fit the models
# model_buy_price.fit(X_train, y_train_buy)
# model_maintenance_cost.fit(X_train, y_train_maintenance)

# # Make predictions
# y_pred_buy = model_buy_price.predict(X_test)
# y_pred_maintenance = model_maintenance_cost.predict(X_test)
# y_pred_total_price = y_pred_buy + y_pred_maintenance
# y_pred_annual_budget = y_pred_total_price * 1.2

# # Calculate Mean Squared Error for total price
# actual_total_price = data.loc[X_test.index, "Total Price"]
# mse_total_price = mean_squared_error(actual_total_price, y_pred_total_price)
# print(f'Mean Squared Error for Total Price: {mse_total_price}')

# # User input for prediction
# year_input = int(input("Enter the Year (e.g., 2025): "))
# category_input = input("Enter the Category (e.g., 'Vehicle and Accessories'): ")

# # Create a DataFrame for the user input
# sample_input = pd.DataFrame({
#     "Year": [year_input],
#     "Category": [category_input]
# })

# # Predict for the user input
# sample_buy = model_buy_price.predict(sample_input)
# sample_maintenance = model_maintenance_cost.predict(sample_input)
# sample_total_price = sample_buy + sample_maintenance
# sample_annual_budget = sample_total_price * 1.2

# # Print the predictions
# print(f'Sample Buy Price: {sample_buy[0]}')
# print(f'Sample Maintenance Cost: {sample_maintenance[0]}')
# print(f'Sample Total Price: {sample_total_price[0]}')
# print(f'Sample Annual Budget: {sample_annual_budget[0]}')
# from sklearn.ensemble import RandomForestRegressor
# from sklearn.metrics import mean_squared_error
# from sklearn.model_selection import train_test_split
# from sklearn.preprocessing import OneHotEncoder, StandardScaler
# from sklearn.compose import ColumnTransformer
# from sklearn.pipeline import Pipeline
# import numpy as np
# import pandas as pd

# # Load the dataset
# data = pd.read_csv("C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\Ml\\budgetval.csv")

# # Define features and target variables
# X = data.drop(columns=["Total Buy Price", "Total Maintenance Cost", "Total Price", "Annual Budget"])
# y_buy_price = data["Total Buy Price"]
# y_maintenance_cost = data["Total Maintenance Cost"]

# # Preprocessing
# preprocessor = ColumnTransformer(
#     transformers=[
#         ("num", StandardScaler(), ["Year"]),
#         ("cat", OneHotEncoder(), ["Category"])
#     ]
# )

# # Create pipelines for both models using RandomForestRegressor
# model_buy_price = Pipeline(steps=[
#     ("preprocessor", preprocessor),
#     ("regressor", RandomForestRegressor(random_state=42))
# ])

# model_maintenance_cost = Pipeline(steps=[
#     ("preprocessor", preprocessor),
#     ("regressor", RandomForestRegressor(random_state=42))
# ])

# # Split the data into training and testing sets
# X_train, X_test, y_train_buy, y_test_buy, y_train_maintenance, y_test_maintenance = train_test_split(
#     X, y_buy_price, y_maintenance_cost, test_size=0.2, random_state=42
# )

# # Fit the models
# model_buy_price.fit(X_train, y_train_buy)
# model_maintenance_cost.fit(X_train, y_train_maintenance)

# # Make predictions
# y_pred_buy = model_buy_price.predict(X_test)
# y_pred_maintenance = model_maintenance_cost.predict(X_test)
# y_pred_total_price = y_pred_buy + y_pred_maintenance
# y_pred_annual_budget = y_pred_total_price * 1.2

# # Calculate Mean Squared Error for total price
# actual_total_price = data.loc[X_test.index, "Total Price"]
# mse_total_price = mean_squared_error(actual_total_price, y_pred_total_price)
# print(f'Mean Squared Error for Total Price: {mse_total_price}')

# # User input for prediction
# year_input = int(input("Enter the Year (e.g., 2025): "))
# category_input = input("Enter the Category (e.g., 'Vehicle and Accessories'): ")

# # Create a DataFrame for the user input
# sample_input = pd.DataFrame({
#     "Year": [year_input],
#     "Category": [category_input]
# })

# # Predict for the user input
# sample_buy = model_buy_price.predict(sample_input)
# sample_maintenance = model_maintenance_cost.predict(sample_input)
# sample_total_price = sample_buy + sample_maintenance
# sample_annual_budget = sample_total_price * 1.2

# # Ensure no negative predictions
# sample_total_price = max(sample_total_price[0], 0)
# sample_annual_budget = max(sample_annual_budget[0], 0)

# # Print the predictions
# print(f'Sample Buy Price: {sample_buy[0]}')
# print(f'Sample Maintenance Cost: {sample_maintenance[0]}')
# print(f'Sample Total Price: {sample_total_price}')
# print

from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import pandas as pd
import numpy as np
from flask_cors import  CORS

app = Flask(__name__)
CORS(app)

# Load the dataset and prepare the model (this part is unchanged)
data = pd.read_csv("C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\Ml\\budgetval.csv")

X = data.drop(columns=["Total Buy Price", "Total Maintenance Cost", "Total Price", "Annual Budget"])
y_buy_price = data["Total Buy Price"]
y_maintenance_cost = data["Total Maintenance Cost"]

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), ["Year"]),
        ("cat", OneHotEncoder(), ["Category"])
    ]
)

model_buy_price = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(random_state=42))
])

model_maintenance_cost = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(random_state=42))
])

X_train, X_test, y_train_buy, y_test_buy, y_train_maintenance, y_test_maintenance = train_test_split(
    X, y_buy_price, y_maintenance_cost, test_size=0.2, random_state=42
)

model_buy_price.fit(X_train, y_train_buy)
model_maintenance_cost.fit(X_train, y_train_maintenance)

# Flask route to handle predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input from the frontend
        data = request.get_json()
        year_input = data['year']
        category_input = data['category']

        # Create DataFrame for the user input
        sample_input = pd.DataFrame({
            "Year": [year_input],
            "Category": [category_input]
        })

        # Make predictions
        sample_buy = model_buy_price.predict(sample_input)
        sample_maintenance = model_maintenance_cost.predict(sample_input)
        sample_total_price = sample_buy + sample_maintenance
        sample_annual_budget = sample_total_price * 1.2

        # Ensure no negative predictions
        sample_total_price = max(sample_total_price[0], 0)
        sample_annual_budget = max(sample_annual_budget[0], 0)

        # Return the predictions as JSON
        return jsonify({
            'buy_price': sample_buy[0],
            'maintenance_cost': sample_maintenance[0],
            'total_price': sample_total_price,
            'annual_budget': sample_annual_budget
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
