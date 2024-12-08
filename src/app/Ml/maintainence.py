from flask import Flask
from flask_cors import CORS
import pandas as pd
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

# Function to load and process the dataset
def load_and_prepare_data(file_path):
    # Load the dataset
    budget_data = pd.read_csv(file_path)
    
    # Group data by 'Year' and sum relevant columns
    df_grouped = budget_data.groupby('Year')[['Total Buy Price', 'Total Maintenance Cost']].sum()
    return df_grouped

# Function to generate and display the stacked bar chart using matplotlib
def generate_stacked_bar_chart(data):
    # Create the stacked bar chart
    data.plot(kind='bar', stacked=True, figsize=(12, 6), color=['#1f77b4', '#ff7f0e'])
    
    # Add titles and labels
    plt.title("Total Buy Price vs. Maintenance Cost Over Years", fontsize=16)
    plt.xlabel("Year", fontsize=12)
    plt.ylabel("Cost (₹ Cr)", fontsize=12)
    plt.legend(title="Cost Type")
    plt.xticks(rotation=45)
    plt.grid(axis='y', linestyle='--', alpha=0.7)
    plt.tight_layout()

    # Show the plot locally (in your development environment)
    plt.show()

# API Route to generate and display the chart

if __name__ == '__main__':
    app.run(debug=True)
