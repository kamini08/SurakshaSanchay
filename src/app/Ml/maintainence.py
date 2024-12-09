import pandas as pd
import matplotlib.pyplot as plt

# Load the hardware inventory data
file_path = 'C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\Ml\\trial1.csv'
hardware_inventory_data = pd.read_csv(file_path)

# Ensure the necessary columns exist in the data
required_columns = ['Item_Age(years)', 'Condition', 'Average_Maintenance_Charge']
for column in required_columns:
    if column not in hardware_inventory_data.columns:
        raise ValueError(f"Missing required column: {column}")

# Aggregate data by grouping item ages into bins
max_age = int(hardware_inventory_data['Item_Age(years)'].max()) + 100
bins = range(0, max_age, 100)  # Group item age into bins of 100
hardware_inventory_data['Age_Group'] = pd.cut(hardware_inventory_data['Item_Age(years)'], bins)

# Calculate the average maintenance cost per age group
age_group_cost = hardware_inventory_data.groupby('Age_Group')['Average_Maintenance_Charge'].mean()

# Plot average maintenance cost by age group
plt.figure(figsize=(12, 6))
age_group_cost.plot(kind='bar', color='lightgreen', edgecolor='black')
plt.title('Average Maintenance Cost by Age Group')
plt.xlabel('Age Group (Years)')
plt.ylabel('Average Maintenance Cost')
plt.grid(axis='y', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()

# Group data by condition and calculate total maintenance cost
condition_cost = hardware_inventory_data.groupby('Condition')['Average_Maintenance_Charge'].sum()

# Plot maintenance cost by condition
plt.figure(figsize=(12, 6))
condition_cost.plot(kind='bar', color=['skyblue', 'orange', 'lightcoral', 'lightyellow'], edgecolor='black')
plt.title('Maintenance Cost by Condition')
plt.xlabel('Condition')
plt.ylabel('Total Maintenance Cost')
plt.grid(axis='y', linestyle='--', alpha=0.5)
plt.tight_layout()
plt.show()
