import {Routes} from 'react-router';
import {Route} from 'react-router';

<div>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="dashboard">
            <Route path="*" element={<Dashboard/>}/>
        </Route>
    </Routes>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="dashboard">
            <Route path="*" element={<Dashboard/>}/>
        </Route>
    </Routes>
    <Controller
        {...abc}
        as={<CustomInput/>}
        rules={rules}
        name={name}
    />
</div>;
