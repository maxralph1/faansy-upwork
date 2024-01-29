import Header from '@/components/private/Header.jsx';
import SideBar from '@/components/private/SideBar.jsx';
import Aside from '@/components/private/Aside.jsx';


export default function Layout({ children }) {
    return (
        <>
            <Header />

            <main className="position-relative d-flex">
                <SideBar />

                { children }

                <Aside />
            </main>
        </>
    )
}
