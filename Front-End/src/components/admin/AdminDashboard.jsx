import {useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon} from "lucide-react";


function DashboardLayoutBasic() {
    const NAVIGATION = [
        { kind: 'header', title: 'Main items',onclick:useDemoRouter('/') },
        { kind:'segment',segment: 'vehicleInfo', title: 'Vehicles Info', icon: '📊',onclick:useDemoRouter('/VehicleInfo') },

        { kind: 'divider',onclick :useDemoRouter('/')},
        { kind: 'header', title: 'Analytics',onclick:useDemoRouter('/analytics') },
        { kind:'segment',segment: 'reports', title: 'Reports', icon: '📈',},
        { subsegment: 'sales', title: 'Analyse fuelling', icon: '📃', onclick:useDemoRouter('/sales') },
        { subsegment: 'traffic', title: 'Remains', icon: '📃',onclick:useDemoRouter('/traffic') },



    ];

    function useDemoRouter(initialPath) {
        const [pathname, setPathname] = useState(initialPath);

        return useMemo(() => ({
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        }), [pathname]);
    }

    // eslint-disable-next-line react/prop-types
     function DropDown({pathToImage}) {
        return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="group inline-flex w-full justify-center gap-x-1.5 rounded-full bg-green-300 px-3 py-2 text-sm font-semibold text-green-900   ring-green-300 hover:bg-green-50 ">
                        <img className='inline-block size-10  rounded-full ring-2 ring-white group-hover:ring-green-300' src={pathToImage} alt="Avator"/>
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-white group-hover:text-green-300" />
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-green-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                                Account settings
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-green-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                                Support
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-green-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                                License
                            </a>
                        </MenuItem>
                        <form action="#" method="POST">
                            <MenuItem>
                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-green-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                >
                                    Sign out
                                </button>
                            </MenuItem>
                        </form>
                    </div>
                </MenuItems>
            </Menu>
        )
    }


    //TODO:Create a  element to function for using logout function
    //TODO:Align the items DashBord Text--> center and Profile Icon--> right middle

    function Skeleton({ height }) {
        return (
            <div
                className="bg-gray-300 rounded-md"
                style={{ height:` ${ height }px` }}
            ></div>
        );
    }
    Skeleton.propTypes={
        height:PropTypes.number.isRequired,
    };



    return (

        <div className='m-5'>
            <div className='rounded-2xl'>
                <div
                    className="w-screen h-24 bg-green-300 text-green-600 flex items-center text-center font-extrabold text-6xl ">

                    <div className='mx-auto'>DashBoard</div>
                    <div className='mx-2 flex '>



                       <DropDown pathToImage={"blabla"}/>
                    </div>

                </div>


                <div className="min-h-screen w-screen bg-gray-100 text-gray-900 flex flex-col md:flex-row">
                    {/* Sidebar */}
                    <nav className="w-full md:w-64 shadow-md bg-green-100">
                        <div className="p-4">
                            <h1 className="text-lg font-semibold text-gray-600">Navigation</h1>
                        </div>
                        <ul className="space-y-2 px-4">
                            {NAVIGATION.map((item, index) => {
                                if (item.kind === 'header') {
                                    return (
                                        <li key={index} className="mt-4 text-sm font-bold text-green-600 " onClick={item.onclick}>
                                            {item.title}
                                        </li>
                                    );
                                }
                                if (item.kind === 'divider') {
                                    return <hr key={index} className="my-4 border-2 border-green-400 hover:text-white" />;
                                }
                                if(item.kind==='segment') {
                                    return (
                                        <li
                                            key={index}
                                            className="flex items-center space-x-2 p-2 hover:bg-green-600 hover:text-white rounded-md cursor-pointer"


                                        >

                                            <span>{item.icon}</span>
                                            <span>{item.title}</span>
                                        </li>

                                    );

                                }
                                return (
                                    <li
                                        key={index}
                                        className="flex items-start mx-4 space-x-2 p-2 hover:bg-green-600 hover:text-white rounded-md cursor-pointer"


                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="col-span-5 md:col-span-1 ">
                                <Skeleton height={14} />
                            </div>
                            <div className="col-span-12">
                                <Skeleton height={14} />
                            </div>
                            <div className="col-span-12">
                                <Skeleton height={14} />
                            </div>
                            <div className="col-span-4">
                                <Skeleton height={100} />
                            </div>
                            <div className="col-span-8">
                                <Skeleton height={100} />
                            </div>
                            <div className="col-span-12">
                                <Skeleton height={150} />
                            </div>
                            <div className="col-span-12">
                                <Skeleton height={14} />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-1">
                                    <Skeleton height={100} />
                                </div>
                                <div className="col-span-1">
                                    <Skeleton height={100} />
                                </div>
                                <div className="col-span-1">
                                    <Skeleton height={100} />
                                </div>
                                <div className="col-span-1">
                                    <Skeleton height={100} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}





export default DashboardLayoutBasic;