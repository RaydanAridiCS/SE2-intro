import { OrderMapper } from '../../src/mappers/Order.mapper';
import { IMapper } from '../../src/mappers/IMapper';
import { IItem } from '../../src/model/interfaces/IItem';

describe('OrderMapper', () => {
    let mockItemMapper: IMapper<string[], IItem>;
    let orderMapper: OrderMapper;

    beforeEach(() => {
        mockItemMapper = {
            map: jest.fn().mockReturnValue({
                id: 'item1',
                name: 'Test Item',
                price: 100,
                getCategory: jest.fn().mockReturnValue('TestCategory'),
            } as IItem),
        };
        orderMapper = new OrderMapper(mockItemMapper);
    });


    it('should throw if itemMapper.map throws', () => {
        (mockItemMapper.map as jest.Mock).mockImplementation(() => {
            throw new Error('Item mapping failed');
        });
        const data = ['order3', 'item3', 'Fail Item', '0', '0', '0', '0'];
        expect(() => orderMapper.map(data)).toThrow('Item mapping failed');
    });
});