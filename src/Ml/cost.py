from flask import Flask
from flask_cors import CORS
from flask import request, jsonify
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("D:\DeltaProjects\SurakshaSanchay\SurakshaSanchay\src\Ml\hardware_inventory_realistic_prices.csv")

X = df[["Category", "Quantity", "Condition", "Maintenance_Charge", "Average_Maintenance_Cost", "Item_Age", "Return_Duration"]]
y = df["Price"]

X = pd.get_dummies(X, columns=["Category", "Condition"], drop_first=True).astype(int)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

price_model = RandomForestRegressor(n_estimators=100, random_state=42)
price_model.fit(X_train, y_train)

y_pred = price_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(mse)

app = Flask(__name__)
CORS(app)


