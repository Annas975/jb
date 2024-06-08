import { faEye, faEyeSlash, faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';

const edit = ({id}) => {
    const { dataAkun, handleEditFormContex, handleDeleteContext } = useJB();
    const loginOptions = ["Game", "Facebook", "Google", "iOS", "Tweeter", "VK", "Tiktok"];

    const [showEditForm, setShowEditForm] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [editedMember, setEditedMember] = useState(null);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [harga, setHarga] = useState('');
    const [jenisGame, setJenisGame] = useState('');
    const [loginVia, setLoginVia] = useState('');
    const handleTogglePassword = (e) => {
        e.stopPropagation(); // Menghentikan penyebaran event
        setShowPassword(!showPassword);
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



    return (
        <>
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
        </>
    )
}

export default edit