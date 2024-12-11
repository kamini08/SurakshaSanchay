import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load the dataset
file_path = 'C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\OverallAnalysis\\analysis.csv'  # Update with your file path
data = pd.read_csv(file_path)

# Strip any trailing or leading spaces in column names
data.columns = data.columns.str.strip()

# Set the style of the plots
sns.set_style('whitegrid')

# 1. Category-wise Total Quantity
plt.figure(figsize=(12, 6))
category_quantity = data.groupby('Category')['Quantity'].sum().sort_values()
category_quantity.plot(kind='bar', color='skyblue', edgecolor='black')
plt.title('Category-wise Total Quantity', fontsize=16)
plt.xlabel('Category', fontsize=14)
plt.ylabel('Total Quantity', fontsize=14)
plt.xticks(rotation=45, fontsize=12)
plt.show()

# 2. Condition vs. Average Maintenance Cost
plt.figure(figsize=(12, 6))
condition_maintenance = data.groupby('Condition')['Average_Maintenance_Charge'].mean().sort_values()
condition_maintenance.plot(kind='bar', color='orange', edgecolor='black')
plt.title('Condition vs. Average Maintenance Cost', fontsize=16)
plt.xlabel('Condition', fontsize=14)
plt.ylabel('Average Maintenance Cost', fontsize=14)
plt.xticks(rotation=45, fontsize=12)
plt.show()

# 3. Location-wise Average Maintenance Charges
plt.figure(figsize=(12, 6))
location_maintenance = data.groupby('Location')['Average_Maintenance_Charge'].mean().sort_values()
location_maintenance.plot(kind='barh', color='green', edgecolor='black')
plt.title('Location-wise Average Maintenance Charges', fontsize=16)
plt.xlabel('Average Maintenance Charge', fontsize=14)
plt.ylabel('Location', fontsize=14)
plt.show()

# 4. Correlation Heatmap
plt.figure(figsize=(10, 8))
corr_matrix = data[['Quantity', 'Average_Maintenance_Charge', 'Item_Age(years)', 'Price']].corr()
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt='.2f', cbar=True)
plt.title('Correlation Heatmap', fontsize=16)
plt.show()

# 5. Category vs. Price
plt.figure(figsize=(12, 6))
sns.boxplot(x='Category', y='Price', data=data, palette='Set2')
plt.title('Box Plot of Prices by Category', fontsize=16)
plt.xlabel('Category', fontsize=14)
plt.ylabel('Price', fontsize=14)
plt.xticks(rotation=45, fontsize=12)
plt.show()

# 6. Category-Wise Maintenance-to-Price Ratio
plt.figure(figsize=(12, 6))
category_ratio = (data.groupby('Category')['Average_Maintenance_Charge'].sum() / 
                  data.groupby('Category')['Price'].sum()).sort_values()
category_ratio.plot(kind='bar', color='purple', edgecolor='black')
plt.title('Category-Wise Maintenance-to-Price Ratio', fontsize=16)
plt.xlabel('Category', fontsize=14)
plt.ylabel('Maintenance-to-Price Ratio', fontsize=14)
plt.xticks(rotation=45, fontsize=12)
plt.show()

# 7. Location-wise Distribution of Item Categories
plt.figure(figsize=(14, 8))
category_location = pd.crosstab(data['Location'], data['Category'])
category_location.plot(kind='bar', stacked=True, colormap='viridis', edgecolor='black', figsize=(14, 8))
plt.title('Location-wise Distribution of Item Categories', fontsize=16)
plt.xlabel('Location', fontsize=14)
plt.ylabel('Count of Items', fontsize=14)
plt.xticks(rotation=45, fontsize=12)
plt.legend(title='Category', fontsize=12, title_fontsize=13)
plt.show()
