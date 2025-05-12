import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../features/users/userSlice";

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const Submit = () => {
        if (!name || !email) {
            alert('Please fill in all fields');
            return;
        }else {
            dispatch(addUser({
                id: crypto.randomUUID(),
                name,
                email,
            }));
            setName('');
            setEmail('');
            alert('User added successfully');
        }

    };

    return (
        
        <div className="p-4 flex gap-2 justify-center flex-col sm:flex-row md:flex-row lg:flex-row">
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 bg-gray-100 border w-1/5  outline-indigo-300 rounded"
                placeholder="NAME..."
                required
            />

            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 bg-gray-100 border w-1/5 outline-indigo-300 rounded"
                placeholder="EMAIL ..."
                required
        
            />

            <button 
            type="submit"
                onClick={Submit}
                className="p-2 rounded bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
                Add User
            </button>
        </div>
    );
};

export default UserForm;
