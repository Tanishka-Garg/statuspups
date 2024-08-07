import '@styles/global.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';


export const metadata = {
    title: "Status-Pups",
    description: "Save lists of dog response codes status",

};

const RootLayout = ({ children }) => {
  return (
    <html>
        <body>
            <Provider>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                <Nav/>
                {children}
            </main>
            </Provider>
        </body>
      
    </html>
  )
};

export default RootLayout;
