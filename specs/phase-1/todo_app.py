# Todo Console App 
import uuid 
import datetime 
class Todo: 
    """Represents a single todo item with title, description, and completion status""" 
    def __init__(self, title, description="", completed=False): 
        # Create a unique ID for each todo item 
        self.id = str(uuid.uuid4()) 
        # Store the title of the todo 
        self.title = title 
        # Store the description of the todo 
        self.description = description 
        # Track whether the todo is completed or not 
        self.completed = completed 
        # Store the creation timestamp 
        self.created_at = datetime.datetime.now() 
    def __str__(self): 
        # Return a formatted string representation of the todo 
        status = "X" if self.completed else "O" 
        return f"[{status}] {self.id[:8]}: {self.title}" 
    def details(self): 
        # Return detailed information about the todo 
        status = "Completed" if self.completed else "Incomplete" 
        return f"ID: {self.id}\\nTitle: {self.title}\\nDescription: {self.description}\\nStatus: {status}\\nCreated: {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}" 
class TodoManager: 
    """Manages a collection of todo items""" 
    def __init__(self): 
        # Initialize an empty list to store todos 
        self.todos = [] 
    def add_todo(self, title, description=""): 
        # Create a new todo with the provided title and description 
        new_todo = Todo(title, description) 
        # Add the new todo to the list 
        self.todos.append(new_todo) 
        print(f"Todo '{title}' added successfully!") 
    def view_todos(self): 
        # Display all todos in the list 
        if not self.todos: 
            print("No todos found.") 
            return 
        print("\\nYour Todos:") 
        for i, todo in enumerate(self.todos, 1): 
            print(f"{i}. {todo}") 
    def get_todo_by_id(self, todo_id): 
        # Get a todo by its ID 
        for todo in self.todos: 
            if todo.id.startswith(todo_id) or todo.id == todo_id: 
                return todo 
        return None 
    def update_todo(self, todo_id, new_title=None, new_description=None): 
        # Update a todo's title and/or description 
        todo = self.get_todo_by_id(todo_id) 
        if todo: 
            if new_title: 
                todo.title = new_title 
            if new_description is not None: 
                todo.description = new_description 
            print(f"Todo '{todo_id[:8]}' updated successfully!") 
        else: 
            print(f"Todo with ID {todo_id[:8]} not found.") 
    def delete_todo(self, todo_id): 
        # Remove a todo from the list 
        todo = self.get_todo_by_id(todo_id) 
        if todo: 
            self.todos.remove(todo) 
            print(f"Todo '{todo.title}' deleted successfully!") 
        else: 
            print(f"Todo with ID {todo_id[:8]} not found.") 
    def mark_complete(self, todo_id): 
        # Mark a todo as completed 
        todo = self.get_todo_by_id(todo_id) 
        if todo: 
            todo.completed = True 
            print(f"Todo '{todo.title}' marked as complete!") 
        else: 
            print(f"Todo with ID {todo_id[:8]} not found.") 
    def mark_incomplete(self, todo_id): 
        # Mark a todo as incomplete 
        todo = self.get_todo_by_id(todo_id) 
        if todo: 
            todo.completed = False 
            print(f"Todo '{todo.title}' marked as incomplete!") 
        else: 
            print(f"Todo with ID {todo_id[:8]} not found.") 
def display_menu(): 
    # Display the main menu options 
    print("\\nWelcome to the Todo Console App!") 
    print("1. Add Todo") 
    print("2. View Todos") 
    print("3. Update Todo") 
    print("4. Delete Todo") 
    print("5. Mark Todo Complete") 
    print("6. Mark Todo Incomplete") 
    print("7. Exit") 
def get_user_choice(): 
    # Get and validate user's menu choice 
    try: 
        choice = int(input("\\nEnter your choice (1-7): ")) 
        return choice 
    except ValueError: 
        print("Invalid input. Please enter a number between 1 and 7.") 
        return None 
def main(): 
    # Main application function 
    # Create an instance of TodoManager 
    todo_manager = TodoManager() 
    # Main application loop 
    while True: 
        # Display the menu 
        display_menu() 
        # Get user's choice 
        choice = get_user_choice() 
        # Process user's choice 
        if choice == 1: 
            # Add a new todo 
            title = input("Enter todo title: ") 
            description = input("Enter todo description (optional): ") 
            todo_manager.add_todo(title, description) 
        elif choice == 2: 
            # View all todos 
            todo_manager.view_todos() 
        elif choice == 3: 
            # Update a todo 
            todo_id = input("Enter todo ID to update: ") 
            print("Leave blank to keep current value") 
            new_title = input("Enter new title (optional): ") 
            new_description = input("Enter new description (optional): ") 
            # Only update if user provided new values 
            if new_title.strip() == "": 
                new_title = None 
            if new_description.strip() == "": 
                new_description = None 
            todo_manager.update_todo(todo_id, new_title, new_description) 
        elif choice == 4: 
            # Delete a todo 
            todo_id = input("Enter todo ID to delete: ") 
            todo_manager.delete_todo(todo_id) 
        elif choice == 5: 
            # Mark a todo as complete 
            todo_id = input("Enter todo ID to mark complete: ") 
            todo_manager.mark_complete(todo_id) 
        elif choice == 6: 
            # Mark a todo as incomplete 
            todo_id = input("Enter todo ID to mark incomplete: ") 
            todo_manager.mark_incomplete(todo_id) 
        elif choice == 7: 
            # Exit the application 
            print("Thank you for using the Todo Console App!") 
            break 
        else: 
            # Handle invalid menu choices 
            if choice is not None: 
                print("Invalid choice. Please enter a number between 1 and 7.") 
        # Pause to let user see the result before showing menu again 
        input("\\nPress Enter to continue...") 
if __name__ == "__main__": 
    # Run the main function when the script is executed directly 
    main() 
