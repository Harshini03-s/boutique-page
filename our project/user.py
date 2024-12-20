import random
from flask import Flask, render_template, request, redirect, session, flash, url_for, jsonify ,send_from_directory
from flask_mysqldb import MySQL
from flask_login import LoginManager, UserMixin, login_user, login_required, current_user, logout_user
from flask_cors import CORS




app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///boutique.db'  # Define database
app.config['SESSION_TYPE'] = 'filesystem'  # To store session data locally
app.secret_key = 'your_secret_key'

# MySQL Configurations
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'shalu_boutique'
app.config['MYSQL_CURSORCLASS']='DictCursor'

# Initialize MySQL connection
mysql = MySQL(app)

@app.route('/test_db')
def test_db():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()
        return f"Connected to database: {db_name[0]}"
    except Exception as e:
        return str(e)

@app.route('/', methods=['GET', 'POST'])
def account():
    if request.method == 'POST':
        first_name = request.form['first-name']
        last_name = request.form['last-name']
        email = request.form['email']
        phone = request.form['phone']

        try:
            with mysql.connection.cursor() as cursor:
                cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                user = cursor.fetchone()
                
                if user:
                    cursor.execute("""UPDATE users 
                                      SET first_name = %s, last_name = %s, phone = %s 
                                      WHERE email = %s""",
                                   (first_name, last_name, phone, email))
                    flash('Profile updated successfully!', 'success')
                else:
                    cursor.execute("""INSERT INTO users (first_name, last_name, email, phone) 
                                      VALUES (%s, %s, %s, %s)""",
                                   (first_name, last_name, email, phone))
                    flash('Profile created successfully!', 'success')
                mysql.connection.commit()
        except Exception as e:
            flash(f"Error occurred: {str(e)}", 'danger')

    return render_template('admin.html')




@app.route('/settings.html', methods=['GET', 'POST'])
def settings():
    if request.method == 'POST':
        # Handle Account Information Update
        first_name = request.form['first-name']
        last_name = request.form['last-name']
        email = request.form['email']

        # Handle Password Change
        current_password = request.form.get('current-password')
        new_password = request.form.get('new-password')
        confirm_password = request.form.get('confirm-password')

        # Process notifications preferences
        email_notifications = 'email-notifications' in request.form
        sms_notifications = 'sms-notifications' in request.form

        cursor = mysql.connection.cursor(mysql.cursors.DictCursor)

        # Example SQL query to update user information (adapt it based on your schema)
        cursor.execute('''UPDATE users 
                          SET first_name=%s, last_name=%s, email=%s, email_notifications=%s, sms_notifications=%s 
                          WHERE user_id=%s''',
                       (first_name, last_name, email, email_notifications, sms_notifications, 1))  # Change '1' to the current user ID

        mysql.connection.commit()
        flash('Settings updated successfully!')
        return redirect('/settings.html')

    return render_template('settings.html')

#@app.route('/orders')
#def orders():
 #   cursor = mysql.connection.cursor(MYSQLdb.cursors.DictCursor)
    
    # Retrieve all orders for a specific user (modify based on user session)
  #  user_id = 1  # Hardcoded for now, replace with actual logged-in user ID
   # cursor.execute('''SELECT order_id, order_date, status, total_amount FROM orders WHERE user_id = %s''', (user_id,))
    #orders = cursor.fetchall()
#
 #   return render_template('orders.html', orders=orders)




@app.route('/move_to_cart.html', methods=['POST'])
def move_to_cart():
    product_id = request.form.get('product_id')
    # Logic to move the item to the cart using product_id
    # For example, update the user's cart in the database
    return redirect(url_for('wishlist'))

@app.route('/remove_from_wishlist.html', methods=['POST'])
def remove_from_wishlist():
    product_id = request.form.get('product_id')
    # Logic to remove the item from the wishlist using product_id
    # For example, update the wishlist in the database
    return redirect(url_for('wishlist'))

@app.route('/wishlist.html')
def wishlist():
    # Retrieve the wishlist items from the database and pass them to the template
    # Example items to simulate a database:
    wishlist_items = [
        {"id": 1, "name": "Elegant Dress", "price": 120.00, "image": "product1.jpg"},
        {"id": 2, "name": "Stylish Jacket", "price": 150.00, "image": "product2.jpg"},
        {"id": 3, "name": "Casual Sneakers", "price": 80.00, "image": "product3.jpg"}
    ]
    return render_template('wishlist.html', items=wishlist_items)




# Dummy data for orders (this could be fetched from a database in a real app)
orders_data = [
    {
        'id': 12345,
        'date': '2024-08-15',
        'status': 'Shipped',
        'total': 250.00
    },
    {
        'id': 12344,
        'date': '2024-07-22',
        'status': 'Delivered',
        'total': 180.00
    },
    {
        'id': 12343,
        'date': '2024-07-10',
        'status': 'Canceled',
        'total': 120.00
    }
]

# Route for the orders page
@app.route('/orders.html')
def orders():
    # Render the template and pass the orders data
    return render_template('orders.html', orders=orders_data)




#@app.route('/login.html', methods=['GET', 'POST'])
#def login():
    # handle login logic
    # if login is successful:
    #login_user('user')  # where 'user' is the logged-in user
    r#eturn redirect(url_for('account'))  # redirect to a protected page




#@app.route('/logout.html')
#@login_required
#def logout():
    #logout_user()
    #return redirect(url_for('logout_page'))

#@app.route('/logout_page.html')
#def logout_page():
    #return render_template('log out.html')



# Route for the contact page
@app.route('/contact.html', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        # Simple form validation
        if not name or not email or not message:
            flash('Please fill out all fields.', 'error')
            return redirect(url_for('contact'))

        # Process the form (e.g., send an email or store in a database)
        flash('Thank you for reaching out! We will get back to you soon.', 'success')
        return redirect(url_for('contact'))

    return render_template('contact.html')

# Route for the home page (Example)
@app.route('/home.html')
def home():
    return render_template('home.html')






# Lookbook route
@app.route('/lookbook.html')
def lookbook():
    return render_template('lookbook.html')


# About route
@app.route('/about.html')
def about():
    return render_template('about.html')



# Serve the shop page
@app.route('/shop.html')
def shop():
    return render_template('shop.html')




# Cart route
#@app.route('/cart.html')
#def cart():
   # return render_template('cart.html')

# sign route
#@app.route('/sign up.html')
#def signup():
    #return render_template('sign up.html')








# Route for login page
@app.route('/login.html', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        # Logic to verify login credentials
       #if email == "test@example.com" and password == "password":
        #    flash('Login successful!', 'success')
         #   return redirect(url_for('home'))
        #else:
         #   flash('Invalid email or password.', 'danger')
        return redirect(url_for('home'))
    return render_template('login.html')

# Route for signup page
@app.route('/signup.html', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        # Logic to add user to the database (not implemented here)
        flash('Sign up successful! Please log in.', 'success')
        return redirect(url_for('login'))
    return render_template('signup.html')

# Route for forgot password page
@app.route('/forgotpassword.html', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']
        # Logic to send password reset email (not implemented here)
        flash('Password reset link sent to your email!', 'info')
    return render_template('forgotpassword.html')



# Logout route
@app.route('/logout.html')
def logout():
    # Clear the session data
    session.clear()
    flash('You have been logged out successfully.', 'info')
    return redirect(url_for('login'))



# Sample route to render the profile page
@app.route('/profile.html', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        # Collect data from the form
        first_name = request.form['first-name']
        last_name = request.form['last-name']
        email = request.form['email']
        phone = request.form['phone']

        # Here you would update the user's information in the database.
        # Example validation: Check if all fields are filled
        if not first_name or not last_name or not email or not phone:
            flash('All fields are required!', 'danger')
        else:
            # Assume a successful update
            flash('Profile updated successfully!', 'success')

        return redirect(url_for('profile'))

    # On GET request, render the profile page
    return render_template('profile.html')


@app.route('/cart.html')
def cart():
    return render_template('cart.html')  # Ensure 'cart.html' exists in the templates folder


# In-memory storage for cart (this can be replaced with database storage)
cart = []

@app.route('/add-to-cart', methods=['POST'])
def add_to_cart():
    global cart
    data = request.json

    # Check if the product is already in the cart
    for item in cart:
        if item['name'] == data['name']:
            item['quantity'] += data['quantity']  # Update quantity
            break
    else:
        # Add new product to the cart
        cart.append({
            'name': data['name'],
            'price': data['price'],
            'quantity': data['quantity'],
        })

    return jsonify({
        'success': True,
        'message': 'Item added to cart.',
        'cart_count': sum(item['quantity'] for item in cart),  # Return updated cart count
    })

@app.route('/cart.html')
def cart_page():
    return render_template('cart.html', cart=cart)

@app.route('/clear-cart', methods=['POST'])
def clear_cart():
    session['cart'] = []  # Reset cart
    return jsonify({'success': True, 'message': 'Cart cleared successfully.'})




@app.route('/cart-data', methods=['GET'])
def get_cart_data():
    cart = session.get('cart', [])  # Retrieve cart from session
    if not isinstance(cart, list):  # Ensure it's a list
        cart = []
    return jsonify({"cart": cart})




@app.route('/remove-item', methods=['POST'])
def remove_item():
    cart = session.get('cart', [])
    item_index = int(request.form.get('item_index'))
    if 0 <= item_index < len(cart):
        cart.pop(item_index)
        session['cart'] = cart  # Update the session
        return jsonify({'success': True, 'message': 'Item removed successfully'})
    return jsonify({'success': False, 'message': 'Invalid item index'})

 

@app.route('/place-order', methods=['POST'])
def place_order():
    cart = session.get('cart', [])
    if not cart:
        return jsonify({'success': False, 'message': 'Your cart is empty'})

    # Mock processing the order
    total_amount = sum(item['price'] * item['quantity'] for item in cart)

    # Save the order to the database (mock example)
    # Save `cart` and `total_amount` to a database table for orders

    # Clear the cart after placing the order
    session.pop('cart', None)

    return jsonify({'success': True, 'message': 'Order placed successfully', 'total': total_amount})

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)




@app.route('/checkout', methods=['GET'])
def checkout():
    return render_template('checkout.html')  # Render the checkout page




def checkout():
    try:
        # Retrieve cart data from the request
        cart_data = request.json
        if not cart_data or not isinstance(cart_data, list):
            return jsonify({"error": "Invalid cart data"}), 400

        cursor = mysql.connection.cursor()

        # Process each cart item
        for item in cart_data:
            product_id = item.get('product_id')
            quantity = item.get('quantity')

            if not product_id or not quantity:
                return jsonify({"error": "Invalid product data"}), 400

            # Check product availability
            cursor.execute("SELECT stock FROM products WHERE id = %s", (product_id,))
            product = cursor.fetchone()
            if not product:
                return jsonify({"error": f"Product ID {product_id} not found"}), 404

            available_stock = product['stock']
            if available_stock < quantity:
                return jsonify({"error": f"Insufficient stock for Product ID {product_id}"}), 400

            # Update stock and insert into orders table
            cursor.execute("UPDATE products SET stock = stock - %s WHERE id = %s", (quantity, product_id))
            cursor.execute("""
                INSERT INTO orders (product_id, quantity, order_date, user_id)
                VALUES (%s, %s, NOW(), %s)
            """, (product_id, quantity, session.get('user_id', 1)))  # Replace with actual user ID from session

        mysql.connection.commit()
        return jsonify({"message": "Order received!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500





if __name__ == '__main__':
    app.run(debug=True)

