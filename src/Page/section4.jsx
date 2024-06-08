import { useState, useEffect } from 'react';
import { useJB } from './context';
import { faEye, faEyeSlash, faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const predefinedGames = [
    { name: "Genshin Impact", image: "../src/assets/genshin.png" },
    { name: "Mobile Legends", image: "../src/assets/mobileLegends.png" },
    { name: "PUBG Mobile", image: "../src/assets/PubgMobile.png" },
    { name: "Free Fire", image: "../src/assets/ff.png" },
];

const loginOptions = ["Game", "Facebook", "Google", "iOS", "Tweeter", "VK", "Tiktok"];

const MemberList = () => {
    const { dataAkun, handleEditFormContex, handleDeleteContext } = useJB();

    const [currentId, setCurrentId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(20);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editedMember, setEditedMember] = useState(null);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [harga, setHarga] = useState('');
    const [jenisGame, setJenisGame] = useState('');
    const [loginVia, setLoginVia] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredNasabah, setFilteredNasabah] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePassword = (e) => {
        e.stopPropagation(); // Menghentikan penyebaran event
        setShowPassword(!showPassword);
    };


    useEffect(() => {
        if (dataAkun && Array.isArray(dataAkun)) {
            setFilteredNasabah(dataAkun);
        }
    }, [dataAkun]);

    useEffect(() => {
        if (dataAkun && Array.isArray(dataAkun)) {
            const filteredData = dataAkun.filter(n => {
                return (
                    n.nickname.toLowerCase().includes(searchQuery) ||
                    n.email.toLowerCase().includes(searchQuery) ||
                    n.password.toLowerCase().includes(searchQuery) ||
                    n.harga.toString().includes(searchQuery) ||
                    n.jenisGame.toLowerCase().includes(searchQuery) ||
                    (Array.isArray(n.loginVia)
                        ? n.loginVia.some(via => via.toLowerCase().includes(searchQuery))
                        : n.loginVia.toLowerCase().includes(searchQuery))
                );
            });
            setFilteredNasabah(filteredData);
        }
    }, [searchQuery, dataAkun]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        console.log("Search Term:", searchTerm); // Debugging log
        setSearchQuery(searchTerm);
    };

    const handleLoginChange = (login) => {
        // Toggle login option
        if (loginVia.includes(login)) {
            setLoginVia(loginVia.filter(item => item !== login));
        } else {
            setLoginVia([...loginVia, login]);
        }
        // Close dropdown
        setIsDropdownOpen(false);
    };

    const handleClick = (id) => {
        setCurrentId(id);
    };

    const handleEditForm = async () => {
        if (!editedMember) return;

        const updatedMember = {
            ...editedMember,
            nickname,
            email,
            password,
            harga,
            jenisGame,
            loginVia
        };

        // Update the member in the context
        console.log('Updated Member before sending to context:', updatedMember); // Debugging log
        handleEditFormContex(updatedMember);
        setShowEditForm(false);
    };

    const handleDelete = (id) => {
        handleDeleteContext(id);
    };

    const handleEdit = (id) => {
        const memberToEdit = dataAkun.find(member => member.id === id);
        setEditedMember(memberToEdit);
        setNickname(memberToEdit.nickname); // Mengatur nickname dengan benar
        setEmail(memberToEdit.email);
        setPassword(memberToEdit.password);
        setHarga(memberToEdit.harga);
        setJenisGame(memberToEdit.jenisGame);
        setLoginVia(memberToEdit.loginVia);
        setShowEditForm(true);
    };

    const handleClose = () => {
        setShowEditForm(false);
    };

    const handleSortChange = (event) => {
        const sortOption = event.target.value;
        let sortedData;
        if (sortOption === 'highest') {
            sortedData = [...filteredNasabah].sort((a, b) => b.harga - a.harga);
        } else if (sortOption === 'lowest') {
            sortedData = [...filteredNasabah].sort((a, b) => a.harga - b.harga);
        }
        setFilteredNasabah(sortedData);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNasabah.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredNasabah.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
        <li
            key={number}
            className={`px-3 py-1 ${currentPage === number ? 'bg-gray-300' : 'bg-white'} border border-gray-300 cursor-pointer`}
            onClick={() => setCurrentPage(number)}
        >
            {number}
        </li>
    ));

    return (
        <div className='bg-[#99A1B7] w-full p-5'>
            <div className='flex flex-col mr-[50px] w-full gap-5 mt-[50px]'>
                <div className='bg-[#ffffff] w-full p-4 border-gray-300 rounded shadow-lg z-10'>
                    <div className='flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4'>
                        {showEditForm && (
                            <div className="fixed inset-0 flex items-center justify-center bg-[#0000009f] z-50">
                                <div className="bg-white p-6 rounded shadow-lg">
                                    <button
                                        className=""
                                        onClick={handleClose}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                    <h1 className="text-center text-2xl font-bold text-[#2D92CF] mb-4">Edit Member</h1>
                                    <div className="flex flex-col gap-4">
                                        <div className='flex flex-col'>
                                            <label htmlFor="">Nickname</label>
                                            <input
                                                type="text"
                                                placeholder="Nickname"
                                                className="border border-gray-300 rounded px-4 py-2"
                                                value={nickname}
                                                onChange={(e) => setNickname(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                className="border border-gray-300 rounded px-4 py-2"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div >
                                          
                                            <div className="flex flex-col relative">
                                            <label htmlFor="">Password</label>
                                                <input className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px]"
                                                    placeholder="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)} />
                                                <button
                                                    type="button"
                                                    className="absolute top-[70%] right-[10px] transform -translate-y-1/2 flex items-center px-3 text-[#2D92CF] focus:outline-none placeholder:Masukkan password"
                                                    onClick={handleTogglePassword}
                                                >
                                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className='flex flex-col'>
                                            <label htmlFor="">Harga</label>
                                            <input
                                                type="number"
                                                placeholder="Harga"
                                                className="border border-gray-300 rounded px-4 py-2"
                                                value={harga}
                                                onChange={(e) => setHarga(Number(e.target.value))}
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="">Jenis Game</label>
                                            <div className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px] bg-white placeholder-gray-500 cursor-pointer flex items-center justify-between" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                                {jenisGame ? (
                                                    <>
                                                        <img className="h-[24px] w-auto rounded-sm mr-2" src={predefinedGames.find(game => game.name === jenisGame)?.image} alt={jenisGame} />
                                                        {jenisGame}
                                                    </>
                                                ) : (
                                                    "Game"
                                                )}
                                                <span className="ml-2">{dropdownOpen ? '▲' : '▼'}</span>
                                            </div>
                                            {dropdownOpen && (
                                                <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
                                                    {predefinedGames.map((game, index) => (
                                                        <div key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-100" onClick={() => { setJenisGame(game.name); setDropdownOpen(false); }}>
                                                            <img className="h-[24px] w-auto rounded-sm mr-2" src={game.image} alt={game.name} />
                                                            {game.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="">Via Login</label>
                                            <div className="resize-none border-solid border-[1.5px] border-[#aeaeae] rounded w-full h-[40px] p-[10px] bg-white placeholder-gray-500 cursor-pointer flex items-center justify-between" onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}>
                                                {loginVia.length > 0 ? loginVia.join(', ') : "Login"}
                                                <span className="ml-2">{isDropdownOpen ? '▲' : '▼'}</span>
                                            </div>
                                            {loginDropdownOpen && (
                                                <div className="absolute top-[45px] left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-10 ">
                                                    {loginOptions.map((option, index) => (
                                                        <div key={index} className={`flex items-center p-2 cursor-pointer max-h-7 hover:bg-[#8CD2FD] ${loginVia.includes(option) ? 'bg-[#2D92CF] text-white' : ''}`} onClick={() => handleLoginChange(option)} >
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>


                                        <button
                                            onClick={handleEditForm}
                                            className="bg-[#2D92CF] hover:bg-[#2D92CF] text-white px-4 py-2 rounded"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <input
                            type="search"
                            value={searchQuery}
                            onChange={handleSearch}
                            placeholder="Search"
                            className='w-full p-2 rounded border border-gray-300'
                        />

                        <select
                            onChange={handleSortChange}
                            defaultValue=""
                            className='w-full md:w-auto p-2 rounded border border-gray-300'
                        >
                            <option value="" disabled>Sort by Price</option>
                            <option value="highest">Harga tertinggi</option>
                            <option value="lowest">Harga Terendah</option>
                        </select>
                    </div>
                </div>

                <div className='overflow-x-auto bg-[#ffffff] p-[20px] border-gray-300 rounded shadow-lg z-60'>
                    <table className='min-w-full bg-white'>
                        <thead className='bg-[#2D92CF] text-white'>
                            <tr>
                                <th className='py-2 px-4'>Nickname</th>
                                <th className='py-2 px-4'>Email</th>
                                <th className='py-2 px-4'>Password</th>
                                <th className='py-2 px-4'>Harga</th>
                                <th className='py-2 px-4'>Jenis Game</th>
                                <th className='py-2 px-4'>Login via</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((member) => (
                                <tr
                                    key={member.id}
                                    className={`border-b ${currentId === member.id ? 'bg-gray-200' : 'bg-gray-100'} hover:bg-gray-300`}
                                    onClick={() => handleClick(member.id)}
                                >
                                    <td className='py-2 px-4'>{member.nickname}</td>
                                    <td className='py-2 px-4'>{member.email}</td>
                                    <td className='py-2 px-4'>{member.password}</td>
                                    <td className='py-2 px-4'>{member.harga.toLocaleString()}</td>
                                    <td className='py-2 px-4 mx-[30px]'>
                                        <div className='flex items-center mx-[30px]'>
                                            <img
                                                src={predefinedGames.find(game => game.name === member.jenisGame)?.image || '/src/assets/default.png'}
                                                alt={member.jenisGame}
                                                className='w-12 h-12 mr-2'
                                            />
                                            <span>{member.jenisGame}</span>
                                        </div>
                                    </td>
                                    <td className='py-2 px-4 mx-[30px]'>{Array.isArray(member.loginVia) ? member.loginVia.join(', ') : member.loginVia}</td>
                                    <td className='py-2 flex gap-2 items-center justify-center'>
                                        <button onClick={() => handleEdit(member.id)} className='bg-[#2D92CF] text-white px-2 py-1 rounded mx-1'><FontAwesomeIcon icon={faPenToSquare} /></button>
                                        <button onClick={() => handleDelete(member.id)} className='bg-[#2D92CF] text-white px-2 py-1 rounded mx-1'><FontAwesomeIcon icon={faTrashCan} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <ul className="flex justify-center mt-4">
                    {renderPageNumbers}
                </ul>
            </div>
        </div>
    );
};

export default MemberList;
